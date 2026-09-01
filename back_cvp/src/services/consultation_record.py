from sqlalchemy.orm import Session

from src.repositories import consultation_record as consultation_record_dao

from src.schemas.consultation_record import ConsultationRecordCreate


def get_all_consultation_id_medical_record(db: Session, id_medical_record: int):
    return consultation_record_dao.select_consultation_record_patient(
        db, id_medical_record
    )


def registry_consultaiton_record(
    db: Session, consultation_record: ConsultationRecordCreate
):
    new_consultation_record = consultation_record_dao.insert_consultation_record(
        db, consultation_record
    )

    db.commit()

    return new_consultation_record
