create or replace function insert_medical_record()
returns trigger
as $$
begin
	insert into medical_record (patient_id)
	values (new.id);
	
	return new;
end;
$$ language plpgsql;

create or replace function verify_hours_doctor_consultation(
	id_doctor int,
	search_date date
)
returns table (
	id int,
	hour_consultation time,
	available boolean
)
as $$
declare
	v_end_time time;
	v_hour_loop time;
	v_existing_consultation int;
	v_id_week_day int;
	v_consultation_duration int;
begin

	select extract(dow from search_date) into v_id_week_day;

	select duration into v_consultation_duration from consultation_duration
	where doctor_id = id_doctor;

	select start_time, end_time into v_hour_loop, v_end_time from doctor_day
	where doctor_id = id_doctor and week_day_id = v_id_week_day;
	
	id := 0;

	while v_hour_loop < v_end_time loop
		
		hour_consultation := v_hour_loop;
		
		select doctor_id into v_existing_consultation from consultation
		where doctor_id = id_doctor and hour = v_hour_loop and consultation_date = search_date
		and status not in ('COMPLETED', 'CANCELED');

		if v_existing_consultation is null then
			available := true;
		else
			available := false;
		end if;
		
		id := id + 1;
		return next;
		
		v_hour_loop := v_hour_loop + (v_consultation_duration * interval '1 minute');

	end loop;

end;

$$ language plpgsql;

create or replace function get_doctor_speciality_filtered(id_speciality int)
returns table(
	doctor_id int,
	name varchar,
	specialities json
)
as $$
begin
	
	return query
	select
	doc.id as doctor_id,
	doc.name,
	json_agg(
		json_build_object(
			'id', spe.id,
			'name', spe.speciality_name
		)
		order by spe.speciality_name
	) as specialities
	from doctor doc
	inner join doctor_speciality ds
		on ds.doctor_id = doc.id
	inner join speciality spe
		on ds.speciality_id = spe.id
	where exists (
		select 1
		from doctor_speciality ds2
		where ds2.doctor_id = doc.id
			and ds2.speciality_id = id_speciality
	)
	group by doc.id, doc.name;
	
end;

$$ language plpgsql;