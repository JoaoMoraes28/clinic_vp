create type gender_option as enum (
	'MALE',
	'FEMALE'
);

create type civil_state_option as enum (
	'SINGLE',
	'MARRIED',
	'DIVORCIED',
	'WIDOWED',
	'SEPARATED'
);

create type status_doctor_recepcionist as enum (
	'ACTIVE',
	'DESACTIVE',
	'VACATION',
	'AWAY'
);

create type status_consultation as enum (
	'SCHEDULED',
	'WAITING',
	'IN_PROGRESS',
	'COMPLETED',
	'CANCELED'
);

create type priority_exame as enum (
	'NORMAL',
	'URGENT'
);

create type blood_type_enum as enum (
    'A_POSITIVE',
    'A_NEGATIVE',
    'B_POSITIVE',
    'B_NEGATIVE',
    'AB_POSITIVE',
    'AB_NEGATIVE',
    'O_POSITIVE',
    'O_NEGATIVE'
);

create table patient (
	id SERIAL primary key,
	name varchar(255) not null,
	professional varchar(255),
	cpf varchar(11) not null unique,
	gender gender_option not null,
	phone varchar(11) not null,
	email varchar(255),
	civil_state civil_state_option not null,
	photo varchar(255),
	blood_type blood_type_enum,
	weight numeric(4,1),
	height int,
	born_date date not null,
	phone_emergency varchar(11),
	notes varchar(500),
	record_date date default current_date
);

create table uf (
	id SERIAL primary key,
	name varchar(30) not null unique,
	abbreviation varchar(2) not null unique
);

create table patient_address (
	id SERIAL primary key,
	patient_id int,
	uf_id int,
	city varchar(150) not null,
	district varchar(150) not null,
	street varchar(150) not null,
	number varchar(10) not null,
	CEP varchar(8) not null,
	constraint fk_patient_adress_uf 
		foreign key (uf_id)
		references uf(id),
	constraint fk_patient_adress_patient
		foreign key (patient_id)
		references patient(id)
);

create table doctor (
	id SERIAL primary key,
	name varchar(255) not null,
	admission_date date default current_date,
	crm varchar(10) not null,
	crm_uf_id int,
	cpf varchar(11) not null unique,
	phone varchar(11) not null,
	email varchar(255) not null unique,
	bio varchar(500),
	photo varchar(255),
	password varchar(10) default 'cvp2802' not null,
	status status_doctor_recepcionist not null,
	gender gender_option not null,
	constraint fk_crm_uf
		foreign key (crm_uf_id)
		references uf(id)
);

create table doctor_address (
	id SERIAL primary key,
	doctor_id int,
	uf_id int,
	city varchar(150) not null,
	district varchar(150) not null,
	street varchar(150) not null,
	number varchar(10) not null,
	constraint fk_doctor_adress_uf 
		foreign key (uf_id)
		references uf(id),
	constraint fk_doctor_adress_doctor
		foreign key (doctor_id)
		references doctor(id)
);

create table recepcionist (
	id SERIAL primary key,
	name varchar(255) not null,
	admission_date date default current_date,
	salary numeric(6,2) not null,
	cpf varchar(11) not null unique,
	status status_doctor_recepcionist not null,
	phone varchar(11) not null,
	email varchar(255) not null unique,
	photo varchar(255),
	password varchar(10) default 'cvp2802' not null,
	gender gender_option not null
);

create table recepcionist_address (
	id SERIAL primary key,
	recepcionist_id int,
	uf_id int,
	city varchar(150) not null,
	district varchar(150) not null,
	street varchar(150) not null,
	number varchar(10) not null,
	constraint fk_recepcionist_adress_uf 
		foreign key (uf_id)
		references uf(id),
	constraint fk_recepcionist_adress_recepcionist
		foreign key (recepcionist_id)
		references recepcionist(id)
);

create table speciality (
	id SERIAL primary key,
	speciality_name varchar(50)
);

create table doctor_speciality (
	id SERIAL primary key,
	doctor_id int,
	speciality_id int,
	constraint fk_doctor_speciality
		foreign key (doctor_id)
		references doctor(id),
	constraint fk_speciality_doctor
		foreign key (speciality_id)
		references speciality(id)
);

create table week_day (
	id smallint primary key,
	day varchar(20) not null unique
);

create table doctor_day (
	id SERIAL primary key,
	doctor_id int,
	week_day_id int,
	start_time time not null,
	end_time time not null,
	constraint fk_doctor_day
		foreign key (doctor_id)
		references doctor(id),
	constraint fk_week_dday_doctor
		foreign key (week_day_id)
		references week_day(id)
);

create table consultation_duration (
	id SERIAL primary key,
	doctor_id int,
	duration int not null,
	constraint fk_duration_doctor
		foreign key (doctor_id)
		references doctor(id)
);

create table contract_type (
	id SERIAL primary key,
	contract varchar(50) not null unique
);

create table contract_doctor (
	id SERIAL primary key,
	contract_type_id int,
	doctor_id int,
	constraint fk_contract_doctor
		foreign key (contract_type_id)
		references contract_type(id),
	constraint fk_doctor_contract
		foreign key (doctor_id)
		references doctor(id)
);

create table medical_record (
	id SERIAL primary key,
	patient_id int,
	constraint fk_medical_patient
		foreign key (patient_id)
		references patient(id)
);

create table consultation (
	id SERIAL primary key,
	medical_record_id int,
	patient_id int,
	doctor_id int,
	speciality_id int,
	recepcionist_id int,
	date date not null,
	hour time not null,
	status status_consultation not null default 'SCHEDULED',
	constraint fk_medical_consultation
		foreign key (medical_record_id)
		references medical_record(id),
	constraint fk_patient_consultation
		foreign key (patient_id)
		references patient(id),
	constraint fk_doctor_consultation
		foreign key (doctor_id)
		references doctor(id),
	constraint fk_recepcionist_consultation
		foreign key (recepcionist_id)
		references recepcionist(id),
	constraint fk_speciality_consultation
		foreign key (speciality_id)
		references speciality(id)
);

create table consultation_record (
	id SERIAL primary key,
	consultation_id int,
	syntoms varchar(600) not null,
	diagnosis varchar(600) not null,
	treatment varchar(600) not null,
	patient_notes varchar(600) not null,
	notes varchar(600) not null,
	constraint fk_consultation_record
		foreign key (consultation_id)
		references consultation(id)
);

create table measure (
	id SERIAL primary key,
	measure_unit varchar(10) not null unique
);

create table laboratory (
	id SERIAL primary key,
	laboratory_name varchar(100) not null unique
);

create table exame_type (
	id SERIAL primary key,
	type_exame varchar(150) not null unique
);
 
create table medicine (
	id SERIAL primary key,
	measure_id int,
	medicine_name varchar(150) not null,
	constraint fk_medicine_measure
		foreign key (measure_id)
		references measure(id)
);

create table medical_recipe (
	id SERIAL primary key,
	consultation_record_id int,
	medicine_id int,
	dosage varchar(255) not null,
	notes varchar(500),
	constraint fk_consultation_medical_recipe
		foreign key (consultation_record_id)
		references consultation_record(id),
	constraint fk_recipe_medicine
		foreign key (medicine_id)
		references medicine(id)
);

create table exame (
	id SERIAL primary key,
	exame_type_id int,
	laboratory_id int,
	priority priority_exame not null,
	limit_date date not null,
	constraint fk_exame_type
		foreign key (exame_type_id)
		references exame_type(id),
	constraint fk_exame_laboratory
		foreign key (laboratory_id)
		references laboratory(id)
);

create table consultation_record_exame (
	id SERIAL primary key,
	exame_id int,
	consultation_record_id int,
	constraint fk_exame_consultation_record
		foreign key (exame_id)
		references exame(id),
	constraint fk_consultation_exame_record
		foreign key (consultation_record_id)
		references consultation_record(id)
);