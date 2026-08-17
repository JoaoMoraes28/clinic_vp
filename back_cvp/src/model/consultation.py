from sqlalchemy.orm import Session
from sqlalchemy import update

from datetime import date

from src.database.models.consultation import Consultation
from src.database.models.views.consultation_data import ConsultationData

from src.schemas.consultation import ConsultationCreate


def select_consultation(db: Session, date: date, id_doctor: int | None):
    if id_doctor:
        return db.query(ConsultationData).filter(ConsultationData.consultation_date == date).filter(ConsultationData.doctor_id == id_doctor).all()

    return db.query(ConsultationData).filter(ConsultationData.consultation_date == date).all()


def select_consultation_id(db: Session, id: int):
    return db.query(ConsultationData).filter(ConsultationData.id == id).first()


def insert_consultation(db: Session, consultation: ConsultationCreate):
    new_consultation = Consultation(**consultation.model_dump())

    db.add(new_consultation)
    db.flush()

    db.refresh(new_consultation)

    return new_consultation.id


def change_status_consultation(db: Session, id: int, new_status: str):
    script = (
        update(Consultation).where(Consultation.id == id).values({"status": new_status})
    )

    result = db.execute(script)
    db.flush()

    if result.rowcount == 0 or result.rowcount > 1:
        return False

    return True
