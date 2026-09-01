from sqlalchemy.orm import Session

from src.repositories import doctor_day as doctor_day_dao

from src.schemas.doctor_day import DoctorDayCreate

from src.exception.exceptions import raise_not_found

from datetime import date, timedelta

from src.schemas.doctor_day import WeekDayJSONBase
from src.schemas.doctor_day import DaysAvailableConsultation


def get_all_doctor_days(db: Session):
    return doctor_day_dao.select_doctor_day(db)


def get_doctor_dates_consultation_id(db: Session, id: int):
    doctor_day_result = doctor_day_dao.select_doctor_day_id(db, id)

    if not doctor_day_result:
        raise_not_found("doctor_day", id)

    days_list_consultation = []

    for data in doctor_day_result.day_hour:
        dates = get_days_consultation_doctor(data)
        days_list_consultation.extend(dates)

    days_list_consultation.sort(key=lambda d: d["consultation_date"])

    return {
        "doctor_id": doctor_day_result.doctor_id,
        "name": doctor_day_result.name,
        "dates": days_list_consultation
    }


def registry_doctor_day(db: Session, doctor_day: DoctorDayCreate):
    new_doctor_day_id = doctor_day_dao.insert_doctor_day(db, doctor_day)

    db.commit()

    return new_doctor_day_id


def delete_doctor_day(db: Session, id_doctor_day: int):
    delete = doctor_day_dao.delete_doctor_day(db, id_doctor_day)

    if not delete:
        db.rollback()
        raise_not_found("doctor_day", id_doctor_day)

    db.commit()


def get_days_consultation_doctor(days_doctor: WeekDayJSONBase):
    day_id = days_doctor["id_day"]
    week_day = days_doctor["day"]
    target_weekday = 6 if day_id == 0 else day_id - 1

    today = date.today()
    days_until = (target_weekday - today.weekday()) % 7
    date_consulting = today + timedelta(days_until)

    consultation_future_days = []

    for _ in range(5):
        new_json_day = DaysAvailableConsultation(
            day=week_day, consultation_date=date_consulting
        )

        date_consulting = date_consulting + timedelta(days=7)

        consultation_future_days.append(new_json_day.model_dump())

    return consultation_future_days
