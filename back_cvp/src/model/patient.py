from src.database.connection import SessionLocal
from src.database.models.patient import Patient
from src.schemas.patient import PatientCreate
from src.schemas.patient import PatientUpdate

db = SessionLocal()

async def select_patients():
    return db.query(Patient).filter(Patient.active == True).all()

async def select_patient_id(id: int):
    return db.query(Patient).filter(Patient.id == id).first()

async def insert_patient(patient: PatientCreate):
    new_patient = Patient(**patient.model_dump())

    db.add(new_patient)
    db.commit()

    db.refresh(new_patient)

    return new_patient

async def update_patient(patient_db: Patient, patient_update: PatientUpdate):
    update_patient = patient_update.model_dump(exclude_unset=True)

    for field, value in update_patient.items():
        setattr(patient_db, field, value)

    db.commit()

    db.refresh(patient_db)

    return patient_db

async def delete_patient(patient: Patient):
    setattr(patient, "active", False)

    db.commit()

async def reactive_patient(patient: Patient):
    setattr(patient, "active", True)
    
    db.commit()