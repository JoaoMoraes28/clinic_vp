from sqlalchemy.orm import Session

from src.database.models.consultation_record import ConsultationRecord
from src.database.models.views.consultation_record_history import (
    ConsultationRecordHistory,
)

from src.schemas.consultation_record import ConsultationRecordCreate


def select_consultation_record_patient(db: Session, id_medical_record: int):
    return (
        db.query(ConsultationRecordHistory)
        .filter(ConsultationRecordHistory.medical_record_id == id_medical_record)
        .all()
    )


def insert_consultation_record(
    db: Session, consultation_record: ConsultationRecordCreate
):
    new_consultations_record = ConsultationRecord(**consultation_record.model_dump())

    db.add(new_consultations_record)
    db.flush()

    db.refresh(new_consultations_record)

    return new_consultations_record.id
