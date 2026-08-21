from sqlalchemy.orm import Session

from datetime import date

from src.model import consultation as consultation_dao

from src.exception.exceptions import raise_not_found

from src.schemas.consultation import ConsultationCreate


def get_all_consultation(db: Session, date: date, id_doctor: int | None):
    return consultation_dao.select_consultation(db, date, id_doctor)


def get_consultation_id(db: Session, id: int):
    consultation = consultation_dao.select_consultation_id(db, id)

    if not consultation:
        raise_not_found("consultation", id)

    return consultation


def get_hours_consultation(db: Session, id_doctor: int, date_consultation: date):
    return consultation_dao.select_hour_doctor_consultation(
        db, id_doctor, date_consultation
    )


def registry_consultation(db: Session, consultation: ConsultationCreate):
    consultation = consultation_dao.insert_consultation(db, consultation)

    db.commit()

    return consultation


def change_status(db: Session, id: int, new_status: str):
    consultation_dao.change_status_consultation(db, id, new_status)

    db.commit()
