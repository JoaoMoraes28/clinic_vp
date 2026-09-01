from sqlalchemy.orm import Session

from sqlalchemy import update

from src.database.models.laboratory import Laboratory

from src.schemas.laboratory import LaboratoryWrite


def select_laboratory(db: Session, filter: bool | None):
    if filter is None:
        return db.query(Laboratory).order_by(Laboratory.laboratory_name).all()

    return (
        db.query(Laboratory)
        .filter(Laboratory.active == filter)
        .order_by(Laboratory.laboratory_name)
        .all()
    )


def insert_laboratory(db: Session, laboratory: LaboratoryWrite):
    new_laboratory = Laboratory(**laboratory.model_dump())

    db.add(new_laboratory)
    db.flush()

    db.refresh(new_laboratory)

    return new_laboratory.id


def change_status_laboratory(db: Session, new_status: bool, id: int):
    script = update(Laboratory).where(Laboratory.id == id).values({"active": new_status})

    result = db.execute(script)
    db.flush()

    if result.rowcount == 0 or result.rowcount > 1:
        return False

    return True
