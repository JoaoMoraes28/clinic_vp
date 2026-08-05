from fastapi import status, HTTPException

from src.model import patient as patient_model

from src.schemas.patient import PatientCreate
from src.schemas.patient import PatientUpdate

async def controller_patients():
    return await patient_model.select_patients()

async def controller_patient_id(id: int):
    get_patient = await patient_model.select_patient_id(id)

    if not get_patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"patient with id {id} not found"
        )

    return get_patient

async def controller_insert_patient(patient: PatientCreate):
    return await patient_model.insert_patient(patient)

async def controller_update_patient(id: int, patient: PatientUpdate):
    get_patient = await patient_model.select_patient_id(id)

    return await patient_model.update_patient(get_patient, patient)

async def controller_delete_patient(id: int):
    get_patient = await patient_model.select_patient_id(id)

    return await patient_model.delete_patient(get_patient)

async def controller_reactive_patient(id: int):
    get_patient = await patient_model.select_patient_id(id)

    return await patient_model.reactive_patient(get_patient)