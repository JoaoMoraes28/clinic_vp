from sqlalchemy.orm import Session

from src.database.connection import Base

from src.repositories import address as address_dao

from src.schemas.address import AddressCreateRecepcionist
from src.schemas.address import AddressCreateDoctor
from src.schemas.address import AddressCreatePatient
from src.schemas.address import AddressCreateAdmin
from src.schemas.address import AddressWithUfId


def get_address(db: Session, id_user: int, model: type[Base], fk_field: str):
    return address_dao.select_address(db, id_user, model, fk_field)


def register_address(
    db: Session,
    address: (
        AddressCreateRecepcionist
        | AddressCreatePatient
        | AddressCreateDoctor
        | AddressCreateAdmin
    ),
    model: type[Base],
):
    return address_dao.insert_address(db, address, model)


def modify_address(
    db: Session,
    address_update: (
        AddressCreateRecepcionist
        | AddressCreatePatient
        | AddressCreateDoctor
        | AddressCreateAdmin
    ),
    address_db: AddressWithUfId,
):
    return address_dao.update_address(db, address_update, address_db)
