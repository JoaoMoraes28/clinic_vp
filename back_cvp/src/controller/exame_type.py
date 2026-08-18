from sqlalchemy.orm import Session

from src.exception.exceptions import raise_not_found

from src.model import exame_type as exame_type_dao

from src.schemas.exame_type import ExameTypeWrite


def get_all_exame_type(db: Session, filter: bool | None):
    return exame_type_dao.select_exame_type(db, filter)


def registry_exame_type(db: Session, exame_type: ExameTypeWrite):
    id = exame_type_dao.insert_exame_type(db, exame_type)

    db.commit()

    return id


def change_status_exame_type(db: Session, new_status: bool, id: int):
    status = exame_type_dao.change_status_exame_type(db, new_status, id)

    if not status:
        raise_not_found("exame_type", id)

    db.commit()
