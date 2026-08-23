create view medicine_data as
select
	med.id as id_medicine,
	med.medicine_name,
	med.active,
	mea.measure_unit
from medicine med
inner join measure mea
	on med.measure_id = mea.id
order by medicine_name;

create view patient_data as
select 
	pat.id,
	pat.name,
	pat.professional,
	pat.cpf,
	pat.gender,
	pat.phone,
	pat.email,
	pat.civil_state,
	pat.photo,
	pat.blood_type,
	pat.weight,
	pat.height,
	pat.born_date,
	pat.phone_emergency,
	pat.notes,
	pat.record_date,
	pat.active,
	med.id as medical_record_id,
	uf.abbreviation as uf_address,
	address.city,
	address.district,
	address.street,
	address.number,
	address.cep
from medical_record med
inner join patient pat
	on med.patient_id = pat.id
inner join patient_address address
	on address.patient_id = pat.id 
inner join uf
	on address.uf_id = uf.id
order by name;

create view doctor_data as
select
	doc.id,
	doc.name,
	doc.admission_date,
	doc.crm,
	doc.cpf,
	doc.phone,
	doc.email,
	doc.bio,
	doc.photo,
	doc.status,
	doc.gender,
	cot.contract,
	uf.abbreviation as uf_crm,
	uf.abbreviation as uf_address,
	address.city,
	address.district,
	address.street,
	address.number,
	address.cep
from doctor doc
inner join doctor_address address
	on address.doctor_id = doc.id
inner join uf
	on address.uf_id = uf.id
left join contract_doctor cod
	on cod.doctor_id = doc.id
left join contract_type cot
	on cot.id = cod.contract_type_id;

create view recepcionist_data as
select 
	rec.id,
	rec.name,
	rec.admission_date,
	rec.salary,
	rec.cpf,
	rec.status,
	rec.phone,
	rec.email,
	rec.photo,
	rec.gender,
	uf.abbreviation as uf_address,
	address.city,
	address.district,
	address.street,
	address.number,
	address.cep
from recepcionist rec
inner join recepcionist_address address
	on address.recepcionist_id = rec.id 
inner join uf
	on address.uf_id = uf.id;

create view consultation_data as
select 
	con.id,
	pat.name as patient_name,
	pat.cpf,
	pat.photo,
	pat.born_date,
	pat.notes,
	pat.phone,
	doc.name as doctor_name,
	doc.id as doctor_id,
	spe.speciality_name,
	con.consultation_date,
	con.hour,
	con.status
from consultation con
inner join patient pat
	on con.patient_id = pat.id
inner join doctor doc
	on con.doctor_id = doc.id 
inner join speciality spe
	on con.speciality_id = spe.id;

create view consultation_record_history as
select
	con.id as consultation_id,
	cre.id as consultation_record_id,
	med.id as medical_record_id,
	con.patient_id,
	con.consultation_date,
	doc.name as doctor_name,
	spe.speciality_name,
	cre.syntoms,
	cre.diagnosis,
	cre.treatment,
	cre.patient_notes
from doctor doc
inner join consultation con
	on con.doctor_id = doc.id
inner join medical_record med
	on med.patient_id = con.patient_id
inner join speciality spe
	on con.speciality_id = spe.id 
inner join consultation_record cre
	on cre.consultation_id = con.id
order by con.consultation_date desc;

create view doctor_speciality_data as
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
group by doc.id, doc.name;

create view consultation_duration_data as
select
	con.id,
	doc.name,
	con.duration
from consultation_duration con
inner join doctor doc
	on con.doctor_id = doc.id;

create view doctor_day_data as
select
	doc.id as doctor_id,
	doc.name,
	json_agg(
		json_build_object(
			'id', dd.id,
			'id_day', wek.id,
			'day', wek.day,
			'start_time', dd.start_time,
			'end_time', dd.end_time		
		)
		order by wek.id
	) as day_hour
from doctor_day dd
inner join doctor doc
	on dd.doctor_id = doc.id
inner join week_day wek
	on dd.week_day_id = wek.id
group by doc.id, doc.name;

create view medical_recipe_data as
select
	mre.id,
	med.medicine_name,
	mea.measure_unit,
	mre.consultation_record_id,
	mre.dosage,
	mre.notes
from medicine med
inner join measure mea
	on med.measure_id  = mea.id
inner join medical_recipe mre
	on  mre.medicine_id = med.id;

create view exame_data as
select
	exa.id,
	con.id as consultation_id,
	cre.consultation_record_id,
	pat.name,
	ety.type_exame,
	lab.laboratory_name,
	exa.priority,
	exa.limit_date
from exame_type ety
inner join exame exa
	on exa.exame_type_id = ety.id
inner join consultation_record_exame cre
	on cre.exame_id = exa.id
inner join laboratory lab
	on exa.laboratory_id = lab.id
inner join consultation_record cor
	on cre.consultation_record_id = cor.id
inner join consultation con
	on cor.consultation_id = con.id
inner join patient pat
	on con.patient_id = pat.id;