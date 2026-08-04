create trigger trg_insert_medical_record
after insert
on patient
for each row
execute function insert_medical_record();
