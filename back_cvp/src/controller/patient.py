from sqlalchemy.orm import Session

from src.model import patient as patient_dao

from src.controller import address as controller_address

from src.exception.exceptions import raise_not_found

from src.schemas.patient import PatientWrite
from src.schemas.address import AddressCreatePatient
from src.schemas.patient import PatientResponseData
from src.schemas.patient import PatientResponse
from src.schemas.address import AddressWithUfStr

from src.database.models import Patient
from src.database.models.views.patient_data import PatientData
from src.database.models.patient_address import PatientAddress


def get_all_patients(db: Session, active: bool):
    return patient_dao.select_patients(db, active)

def get_patient_id(db: Session, id: int, active: bool):
    get_patient = patient_dao.select_patient_id(db, id, active, PatientData)

    if not get_patient:
        raise_not_found("patient", id)

    return build_patient_response(get_patient)


def get_patient_entity(db: Session, id: int, active: bool):
    get_patient = patient_dao.select_patient_id(db, id, active, Patient)

    if not get_patient:
        raise_not_found("patient", id)

    return get_patient


def register_patient(db: Session, patient: PatientWrite):
    try:
        patient_id = patient_dao.insert_patient(db, patient.patient)

        patient_address = AddressCreatePatient(
            patient_id=patient_id, **patient.address.model_dump()
        )

        controller_address.register_address(
            db, patient_address, PatientAddress
        )

        db.commit()

        return get_patient_id(db, patient_id, True)

    except Exception:
        db.rollback()
        raise


def modify_patient(db: Session, id: int, patient: PatientWrite):
    try:
        get_patient = get_patient_entity(db, id, True)
        patient_dao.update_patient(db, get_patient, patient.patient)

        get_address = controller_address.get_address(
            db, id, PatientAddress, "patient_id"
        )
        controller_address.modify_address(db, patient.address, get_address)

        db.commit()

        return get_patient_id(db, id, True)

    except Exception:
        db.rollback()
        raise


def deactivate_patient(db: Session, id: int):
    get_patient = get_patient_entity(db, id, True)

    patient_desactivate = patient_dao.delete_patient(db, get_patient)

    db.commit()

    return patient_desactivate


def reactive_patient(db: Session, id: int):
    get_patient = get_patient_entity(db, id, False)

    patient_reactivate = patient_dao.reactive_patient(db, get_patient)

    db.commit()

    return patient_reactivate


def build_patient_response(patient):
    new_JSON = PatientResponseData(
        patient=PatientResponse(
            id=patient.id,
            name=patient.name,
            professional=patient.professional,
            cpf=patient.cpf,
            gender=patient.gender,
            phone=patient.phone,
            email=patient.email,
            civil_state=patient.civil_state,
            photo=patient.photo,
            blood_type=patient.blood_type,
            weight=patient.weight,
            height=patient.height,
            phone_emergency=patient.phone_emergency,
            notes=patient.notes,
            record_date=patient.record_date,
            active=patient.active,
            born_date=patient.born_date,
        ),
        address=AddressWithUfStr(
            uf_address=patient.uf_address,
            city=patient.city,
            district=patient.district,
            street=patient.street,
            number=patient.number,
            cep=patient.cep,
        )
    )

    return new_JSON
