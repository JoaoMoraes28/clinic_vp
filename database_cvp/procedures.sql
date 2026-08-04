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
	consultation_date date
)
returns table (
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

	select extract(dow from consultation_date) into v_id_week_day;

	select duration into v_consultation_duration from consultation_duration
	where doctor_id = id_doctor;

	select start_time, end_time into v_hour_loop, v_end_time from doctor_day
	where doctor_id = id_doctor and week_day_id = v_id_week_day;
	
	while v_hour_loop < v_end_time loop
		
		hour_consultation := v_hour_loop;
		
		select doctor_id into v_existing_consultation from consultation
		where doctor_id = id_doctor and hour = v_hour_loop and date = consultation_date
		and status not in ('completed', 'canceled');

		if v_existing_consultation is null then
			available := true;
		else
			available := false;
		end if;

		return next;

		v_hour_loop := v_hour_loop + (v_consultation_duration * interval '1 minute');

	end loop;

end;

$$ language plpgsql;