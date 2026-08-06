from sqlalchemy.orm import Session
from src.database.models.patient import Patient
from src.database.models.views.patient_data import PatientData
from src.database.connection import Base

from src.schemas.patient import PatientBase

def select_patients(db: Session, active: bool):
    return db.query(PatientData).filter(PatientData.active == active).all()

def select_patient_id(db: Session, id: int, active: bool, model: type[Base]):
    return db.query(model).filter(model.id == id).filter(model.active == active).first()

def insert_patient(db: Session, patient: PatientBase):
    new_patient = Patient(**patient.model_dump())

    db.add(new_patient)
    db.flush()

    db.refresh(new_patient)

    return new_patient.id

def update_patient(db: Session, patient_db: Patient, patient_update: PatientBase):
    update_patient = patient_update.model_dump(exclude_unset=True)

    for field, value in update_patient.items():
        setattr(patient_db, field, value)

    db.flush()

    db.refresh(patient_db)

    return patient_db

def delete_patient(db: Session, patient: Patient):
    setattr(patient, "active", False)

    db.flush()

def reactive_patient(db: Session, patient: Patient):
    setattr(patient, "active", True)
    
    db.flush()