from sqlalchemy.orm import Session

from src.exception.exceptions import raise_not_found

from src.model import laboratory as laboratory_dao

from src.schemas.laboratory import LaboratoryWrite


def get_all_laboratory(db: Session, filter: bool | None):
    return laboratory_dao.select_laboratory(db, filter)


def registry_laboratory(db: Session, laboratory: LaboratoryWrite):
    id = laboratory_dao.insert_laboratory(db, laboratory)

    db.commit()

    return id


def change_status_laboratory(db: Session, id: int, new_status: bool):
    status = laboratory_dao.change_status_laboratory(db, new_status, id)

    if not status:
        db.rollback()
        raise_not_found("laboratory", id)

    db.commit()
