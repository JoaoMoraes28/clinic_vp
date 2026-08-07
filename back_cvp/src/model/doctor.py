from sqlalchemy.orm import Session

from src.database.connection import Base
from src.database.models.doctor import Doctor
from src.database.models.views.doctor_data import DoctorData
from src.schemas.doctor import DoctorCreate
from src.schemas.doctor import DoctorUpdateData

def select_doctor(db: Session, filter="ACTIVE"):
    return db.query(DoctorData).filter(DoctorData.status == filter).all()

def select_doctor_id(
    db: Session, 
    id: int,
    model: type[Base]
):
    return db.query(model).filter(model.id == id).first()

def insert_doctor(db: Session, doctor: DoctorCreate):
    new_doctor = Doctor(**doctor.model_dump())

    db.add(new_doctor)
    db.flush()

    db.refresh(new_doctor)

    return new_doctor.id

def update_doctor(
    db: Session, 
    doctor_update: DoctorUpdateData, 
    doctor_db: Doctor
):
    update_doctor = doctor_update.model_dump(exclude_unset=True)

    for field, value in update_doctor.items():
        setattr(doctor_db, field, value)

    db.flush()


def change_status_doctor(db: Session, new_status: str, doctor_db: Doctor):
    setattr(doctor_db, "status", new_status)

    db.flush()