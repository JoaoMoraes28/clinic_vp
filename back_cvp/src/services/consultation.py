from collections import defaultdict

from sqlalchemy.orm import Session

from datetime import date, time

from src.repositories import consultation as consultation_dao

from src.exception.exceptions import raise_not_found

from src.schemas.consultation import ConsultationCreate
from src.schemas.consultation import ConsultationResponsePreview
from src.schemas.consultation import ConsultationPreview
from src.schemas.consultation import CountConsultationResponse


def get_all_consultation(db: Session, date: date, id_doctor: int | None):
    consultations = consultation_dao.select_consultation(db, date, id_doctor)

    consultation_by_hour = defaultdict(list)

    for consultation in consultations:
        hour = consultation.hour.hour

        _consultation = ConsultationPreview(
            id=consultation.id,
            patient_name=consultation.patient_name,
            doctor_name=consultation.doctor_name,
            hour=consultation.hour,
            speciality_name=consultation.speciality_name,
            status=consultation.status,
        )

        consultation_by_hour[(hour, 0)].append(_consultation)

    response_consultations: list[ConsultationResponsePreview] = []

    for hour in range(8, 19):
        _consultation = ConsultationResponsePreview(
            hour=str(time(hour, 0)), consultations=consultation_by_hour[hour, 0]
        )

        response_consultations.append(_consultation)

    return response_consultations


def get_consultation_id(db: Session, id: int):
    consultation = consultation_dao.select_consultation_id(db, id)

    if not consultation:
        raise_not_found("consultation", id)

    return consultation


def get_hours_consultation(db: Session, id_doctor: int, date_consultation: date):
    return consultation_dao.select_hour_doctor_consultation(
        db, id_doctor, date_consultation
    )


def get_count_consultation(db: Session, date_consultation: date):
    resume = consultation_dao.select_cound_consultation(db, date_consultation)

    response: CountConsultationResponse = {}
    index: int = 0
    totalConsultation: int = 0

    while index < len(resume):
        label = str(resume[index][0]).split(".")
        response[label[1].lower()] = resume[index][1]
        totalConsultation = totalConsultation + resume[index][1]

        index = index + 1

    response["total"] = totalConsultation

    return response


def registry_consultation(db: Session, consultation: ConsultationCreate):
    consultation = consultation_dao.insert_consultation(db, consultation)

    db.commit()

    return consultation


def change_status(db: Session, id: int, new_status: str):
    consultation_dao.change_status_consultation(db, id, new_status)

    db.commit()
