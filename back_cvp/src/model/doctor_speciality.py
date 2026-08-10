from sqlalchemy.orm import Session
from sqlalchemy import delete

from src.database.models.doctor_speciality import DoctorSpeciality
from src.database.models.views.doctor_speciality_data import DoctorSpecialityData

from src.schemas.doctor_speciality import DoctorSpecialityCreate
from src.schemas.doctor_speciality import DoctorSpecialityDelete


def select_doctor_speciality(db: Session):
    return db.query(DoctorSpecialityData).all()


def insert_doctor_speciality(db: Session, doctor_speciality: DoctorSpecialityCreate):
    new_doctor_speciality = DoctorSpeciality(**doctor_speciality.model_dump())

    db.add(new_doctor_speciality)
    db.flush()

    db.refresh(new_doctor_speciality)

    return new_doctor_speciality.id


def delete_doctor_speciality(db: Session, doctor_speciality_id: DoctorSpecialityDelete):
    script = delete(DoctorSpeciality).where(
        (DoctorSpeciality.doctor_id == doctor_speciality_id.doctor_id)
        & (DoctorSpeciality.speciality_id == doctor_speciality_id.speciality_id)
    )

    result = db.execute(script)
    db.flush()

    if result.rowcount == 0 or result.rowcount > 1:
        return False

    return True
