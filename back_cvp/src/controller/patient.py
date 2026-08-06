from fastapi import status, HTTPException
from sqlalchemy.orm import Session

from src.model import patient as patient_dao

from src.controller import address as controller_address

from src.schemas.patient import PatientWrite
from src.schemas.address import AddressCreatePatient

from src.database.models import Patient
from src.database.models.views.patient_data import PatientData
from src.database.models.patient_address import PatientAddress

def controller_select_patients(db: Session, active: bool):
    return patient_dao.select_patients(db, active)

def controller_select_patient_id(db: Session, id: int, active: bool):
    get_patient = patient_dao.select_patient_id(db, id, active, PatientData)

    if not get_patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"patient with id {id} not found"
        )

    return get_patient

def controller_select_patient_id_entity(db: Session, id: int, active: bool):
    get_patient = patient_dao.select_patient_id(db, id, active, Patient)

    if not get_patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"patient with id {id} not found"
        )

    return get_patient

def controller_insert_patient(db: Session, patient: PatientWrite):
    try:
        patient_id = patient_dao.insert_patient(db, patient.patient)
        
        patient_address = AddressCreatePatient(
            patient_id=patient_id,
            **patient.address.model_dump()
        )
        
        controller_address.controller_insert_address(db, patient_address, PatientAddress)

        db.commit()
        
        return controller_select_patient_id(db, patient_id, True)
    
    except:
        db.rollback()
        raise

def controller_update_patient(db: Session, id: int, patient: PatientWrite):
    try:
        get_patient = controller_select_patient_id_entity(db, id, True)
        patient_dao.update_patient(db, get_patient, patient.patient)
        
        get_address = controller_address.controller_select_address(db, id, PatientAddress, "patient_id")
        controller_address.controller_update_address(db, patient.address, get_address)

        db.commit()

        return controller_select_patient_id(db, id, True)

    except:
        db.rollback()
        raise

def controller_delete_patient(db: Session, id: int):
    get_patient = controller_select_patient_id_entity(db, id, True)

    db.commit()

    return patient_dao.delete_patient(db, get_patient)

def controller_reactive_patient(db: Session, id: int):
    get_patient = controller_select_patient_id_entity(db, id, False)

    db.commit()

    return patient_dao.reactive_patient(db, get_patient)