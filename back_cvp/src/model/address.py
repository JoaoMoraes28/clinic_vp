from sqlalchemy.orm import Session

from src.database.connection import Base

from src.schemas.address import AddressCreateDoctor
from src.schemas.address import AddressCreatePatient
from src.schemas.address import AddressCreateRecepcionist
from src.schemas.address import AddressWithUfId


def select_address(db: Session, id_user: int, model: type[Base], fk_field: str):
    column = getattr(model, fk_field)

    return db.query(model).filter(column == id_user).first()


def insert_address(
    db: Session,
    address: AddressCreateDoctor | AddressCreatePatient | AddressCreateRecepcionist,
    model: type[Base],
):
    new_address = model(**address.model_dump())

    db.add(new_address)
    db.flush()

    db.refresh(new_address)

    return new_address


def update_address(
    db: Session,
    address_update: (
        AddressCreateDoctor | AddressCreatePatient | AddressCreateRecepcionist
    ),
    address_db: AddressWithUfId,
):
    update_address = address_update.model_dump(exclude_unset=True)

    for field, value in update_address.items():
        setattr(address_db, field, value)

    db.flush()

    db.refresh(address_db)

    return address_db
