from sqlalchemy.orm import Session

from src.schemas.recepcionist import RecepcionistBase

from src.database.models.views.recepcionist_data import RecepcionistData
from src.database.models.recepcionist import Recepcionist
from src.database.connection import Base


def select_recepcionist(db: Session, filter: str):
    return db.query(RecepcionistData).filter(RecepcionistData.status == filter).all()


def select_recepcionist_id(db: Session, id: int, model: type[Base]):
    return db.query(model).filter(model.id == id).first()


def insert_recepcionist(db: Session, recepcionist: RecepcionistBase):
    new_recepcionist = Recepcionist(**recepcionist.model_dump())

    db.add(new_recepcionist)
    db.flush()

    db.refresh(new_recepcionist)

    return new_recepcionist.id


def update_recepcionist(
    db: Session,
    recepcionist_update: RecepcionistBase,
    recepcionist_db: Recepcionist,
):
    update_recepcionist = recepcionist_update.model_dump(exclude_unset=True)

    for field, value in update_recepcionist.items():
        setattr(recepcionist_db, field, value)

    db.flush()
    db.refresh(recepcionist_db)

    return recepcionist_db.id


def change_status_recepcionist(
    db: Session, recepcionist_db: Recepcionist, new_status: str
):
    setattr(recepcionist_db, "status", new_status)

    db.flush()
