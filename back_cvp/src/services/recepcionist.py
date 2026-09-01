from sqlalchemy.orm import Session

from src.exception.exceptions import raise_not_found

from src.repositories import recepcionist as recepcionist_dao

from src.services import address as controller_address

from src.schemas.recepcionist import RecepcionistCreateNoPassword
from src.schemas.recepcionist import RecepcionistCreateBaseWithPassword
from src.schemas.recepcionist import RecepcionistCreateResponse
from src.schemas.recepcionist import RecepcionistUpdate
from src.schemas.recepcionist import RecepcionistResponseData
from src.schemas.recepcionist import RecepcionistResponse
from src.schemas.recepcionist import RecepcionistChangeStatus
from src.schemas.address import AddressWithUfStr
from src.schemas.address import AddressCreateRecepcionist

from src.database.models.views.recepcionist_data import RecepcionistData
from src.database.models.recepcionist import Recepcionist
from src.database.models.recepcionist_address import RecepcionistAddress

from .password import password_initial
from src.security.password_hash import hash_password


def get_all_recepcionist(db: Session, filter: str | None):
    get_recepcionists = recepcionist_dao.select_recepcionist(db, filter)

    return build_recepcionist_response(get_recepcionists)


def get_recepcionist_id(db: Session, id: int):
    get_recepcionist = recepcionist_dao.select_recepcionist_id(db, id, RecepcionistData)

    if not get_recepcionist:
        raise_not_found("recepcionist", id)

    return build_recepcionist_response(get_recepcionist)


def get_recepcionist_entity(db: Session, id: int):
    get_recepcionist = recepcionist_dao.select_recepcionist_id(db, id, Recepcionist)

    if not get_recepcionist:
        raise_not_found("recepcionist", id)

    return get_recepcionist


def registry_recepcionist(db: Session, recepcionist: RecepcionistCreateNoPassword):
    try:
        recepcionist_insert = RecepcionistCreateBaseWithPassword(
            password=hash_password(password_initial),
            **recepcionist.recepcionist.model_dump()
        )

        recepcionist_id = recepcionist_dao.insert_recepcionist(db, recepcionist_insert)

        address_recepcionist = AddressCreateRecepcionist(
            recepcionist_id=recepcionist_id, **recepcionist.address.model_dump()
        )

        controller_address.register_address(
            db, address_recepcionist, RecepcionistAddress
        )

        recepcionist_data = get_recepcionist_entity(db, recepcionist_id)

        recepcionist_response = RecepcionistCreateResponse(
            id=recepcionist_data.id,
            name=recepcionist_data.name,
            email=recepcionist_data.email,
            password=password_initial,
            must_change_password=recepcionist_data.must_change_password,
        )

        db.commit()

        return recepcionist_response

    except Exception:
        db.rollback()
        raise


def modify_recepcionist(db: Session, id: int, update_recepcionist: RecepcionistUpdate):
    try:
        get_recepcionist = get_recepcionist_entity(db, id)
        recepcionist_dao.update_recepcionist(
            db, update_recepcionist.recepcionist, get_recepcionist
        )

        get_address = controller_address.get_address(
            db, id, RecepcionistAddress, "recepcionist_id"
        )
        controller_address.modify_address(db, update_recepcionist.address, get_address)

        db.commit()

        return get_recepcionist_id(db, id)

    except Exception:
        db.rollback()
        raise


def modify_status_recepcionist(
    db: Session, id: int, new_status: RecepcionistChangeStatus
):
    recepcionist = get_recepcionist_entity(db, id)

    recepcionist_dao.change_status_recepcionist(db, recepcionist, new_status.new_status)

    db.commit()


def build_recepcionist_response(recepcionist):
    if isinstance(recepcionist, list):

        _recepcionists = []

        for _recepcionist in recepcionist:
            new_JSON = RecepcionistResponseData(
                recepcionist=RecepcionistResponse(
                    id=_recepcionist.id,
                    name=_recepcionist.name,
                    admission_date=_recepcionist.admission_date,
                    salary=_recepcionist.salary,
                    cpf=_recepcionist.cpf,
                    phone=_recepcionist.phone,
                    email=_recepcionist.email,
                    photo=_recepcionist.photo,
                    status=_recepcionist.status,
                    gender=_recepcionist.gender,
                    must_change_password=_recepcionist.must_change_password,
                ),
                address=AddressWithUfStr(
                    uf_address=_recepcionist.uf_address,
                    city=_recepcionist.city,
                    district=_recepcionist.district,
                    street=_recepcionist.street,
                    number=_recepcionist.number,
                    cep=_recepcionist.cep,
                ),
            )

            _recepcionists.append(new_JSON)

        return _recepcionists

    new_JSON = RecepcionistResponseData(
        recepcionist=RecepcionistResponse(
            id=recepcionist.id,
            name=recepcionist.name,
            admission_date=recepcionist.admission_date,
            salary=recepcionist.salary,
            cpf=recepcionist.cpf,
            phone=recepcionist.phone,
            email=recepcionist.email,
            photo=recepcionist.photo,
            status=recepcionist.status,
            gender=recepcionist.gender,
            must_change_password=recepcionist.must_change_password,
        ),
        address=AddressWithUfStr(
            uf_address=recepcionist.uf_address,
            city=recepcionist.city,
            district=recepcionist.district,
            street=recepcionist.street,
            number=recepcionist.number,
            cep=recepcionist.cep,
        ),
    )

    return new_JSON
