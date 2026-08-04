create view medicine_data as
select
	med.id as id_medicine,
	med.medicine_name,
	mea.measure_unit
from medicine med
inner join measure mea
	on med.measure_id = mea.id;
 
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
	uf.abbreviation as uf,
	address.city,
	address.district,
	address.street,
	address.number,
	address.CEP
from patient pat
inner join patient_address address
	on address.patient_id = pat.id 
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
	spe.speciality_name,
	con.date,
	con.hour,
	con.status
from consultation con
inner join patient pat
	on con.patient_id = pat.id
inner join doctor doc
	on con.doctor_id = doc.id 
inner join speciality spe
	on con.speciality_id = spe.id;

create view medical_record_resume as
select
	con.patient_id,
	conrec.syntoms,
	conrec.diagnosis,
	conrec.treatment,
	conrec.patient_notes,
	con.date,
	doc.name,
	spe.speciality_name
from consultation con
inner join consultation_record conrec
	on conrec.consultation_id = con.id
inner join doctor doc
	on con.doctor_id = doc.id
inner join speciality spe
	on con.speciality_id = spe.id;