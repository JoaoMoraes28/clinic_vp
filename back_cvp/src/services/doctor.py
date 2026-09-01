from sqlalchemy.orm import Session

from src.schemas.doctor import DoctorCreateDataWithPassword
from src.schemas.doctor import DoctorCreateDataNoPassword
from src.schemas.doctor import DoctorResponseCreate
from src.schemas.doctor import DoctorUpdate
from src.schemas.doctor import DoctorChangeStatus
from src.schemas.doctor import DoctorDataResponse
from src.schemas.doctor import DoctorResponse
from src.schemas.address import AddressCreateDoctor
from src.schemas.address import AddressWithUfStr

from src.exception.exceptions import raise_not_found

from src.repositories import doctor as doctor_dao
from src.services import address as controller_address

from src.database.models.doctor_address import DoctorAddress
from src.database.models.doctor import Doctor
from src.database.models.views.doctor_data import DoctorData

from src.security.password_hash import hash_password
from .password import password_initial


def get_all_doctors(db: Session, filter: str | None):
    doctors = doctor_dao.select_doctor(db, filter)

    return build_doctor_response(doctors)


def get_doctor_id(db: Session, id: int):
    doctor = doctor_dao.select_doctor_id(db, id, DoctorData)

    if not doctor:
        raise_not_found("doctor", id)

    return build_doctor_response(doctor)


def get_doctor_entity(db: Session, id: int):
    doctor = doctor_dao.select_doctor_id(db, id, Doctor)

    if not doctor:
        raise_not_found("doctor", id)

    return doctor


def register_doctor(db: Session, doctor: DoctorCreateDataNoPassword):
    try:
        doctor_insert = DoctorCreateDataWithPassword(
            password=hash_password(password_initial), **doctor.doctor.model_dump()
        )

        doctor_id = doctor_dao.insert_doctor(db, doctor_insert)

        doctor_address = AddressCreateDoctor(
            doctor_id=doctor_id, **doctor.address.model_dump()
        )

        controller_address.register_address(db, doctor_address, DoctorAddress)

        doctor_data = get_doctor_entity(db, doctor_id)

        doctor_response = DoctorResponseCreate(
            id=doctor_data.id,
            name=doctor_data.name,
            email=doctor_data.email,
            password=password_initial,
            must_change_password=doctor_data.must_change_password,
        )

        db.commit()

        return doctor_response

    except Exception:
        db.rollback()
        raise


def modify_doctor(db: Session, id: int, doctor_update: DoctorUpdate):
    try:
        get_doctor = get_doctor_entity(db, id)
        doctor_dao.update_doctor(db, doctor_update.doctor, get_doctor)

        get_address = controller_address.get_address(db, id, DoctorAddress, "doctor_id")
        controller_address.modify_address(db, doctor_update.address, get_address)

        db.commit()

        return get_doctor_id(db, id)

    except Exception:
        db.rollback()
        raise


def modify_status_doctor(db: Session, id: int, new_status: DoctorChangeStatus):
    get_doctor = get_doctor_entity(db, id)

    doctor_dao.change_status_doctor(db, new_status.new_status, get_doctor)

    db.commit()


def build_doctor_response(doctor):
    if isinstance(doctor, list):

        _doctors = []

        for _doctor in doctor:
            new_JSON = DoctorDataResponse(
                doctor=DoctorResponse(
                    id=_doctor.id,
                    name=_doctor.name,
                    admission_date=_doctor.admission_date,
                    crm=_doctor.crm,
                    uf_crm=_doctor.uf_crm,
                    cpf=_doctor.cpf,
                    phone=_doctor.phone,
                    email=_doctor.email,
                    bio=_doctor.bio,
                    photo=_doctor.photo,
                    status=_doctor.status,
                    gender=_doctor.gender,
                    contract=_doctor.contract,
                    must_change_password=_doctor.must_change_password,
                ),
                address=AddressWithUfStr(
                    uf_address=_doctor.uf_address,
                    city=_doctor.city,
                    district=_doctor.district,
                    street=_doctor.street,
                    number=_doctor.number,
                    cep=_doctor.cep,
                ),
            )

            _doctors.append(new_JSON)

        return _doctors

    new_JSON = DoctorDataResponse(
        doctor=DoctorResponse(
            id=doctor.id,
            name=doctor.name,
            admission_date=doctor.admission_date,
            crm=doctor.crm,
            uf_crm=doctor.uf_crm,
            cpf=doctor.cpf,
            phone=doctor.phone,
            email=doctor.email,
            bio=doctor.bio,
            photo=doctor.photo,
            status=doctor.status,
            gender=doctor.gender,
            contract=doctor.contract,
            must_change_password=doctor.must_change_password,
        ),
        address=AddressWithUfStr(
            uf_address=doctor.uf_address,
            city=doctor.city,
            district=doctor.district,
            street=doctor.street,
            number=doctor.number,
            cep=doctor.cep,
        ),
    )

    return new_JSON
