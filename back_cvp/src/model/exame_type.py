from sqlalchemy.orm import Session

from sqlalchemy import update

from src.database.models.exame_type import ExameType

from src.schemas.exame_type import ExameTypeWrite


def select_exame_type(db: Session, filter: bool | None):
    if filter is None:
        return db.query(ExameType).order_by(ExameType.type_exame).all()

    return (
        db.query(ExameType)
        .filter(ExameType.active == filter)
        .order_by(ExameType.type_exame)
        .all()
    )


def insert_exame_type(db: Session, exame_type: ExameTypeWrite):
    new_exame_type = ExameType(**exame_type.model_dump())

    db.add(new_exame_type)
    db.flush()

    db.refresh(new_exame_type)

    return new_exame_type.id


def change_status_exame_type(db: Session, new_status: bool, id: int):
    script = update(ExameType).where(ExameType.id == id).values({"active": new_status})

    result = db.execute(script)
    db.flush()

    if result.rowcount == 0 or result.rowcount > 1:
        return False

    return True
