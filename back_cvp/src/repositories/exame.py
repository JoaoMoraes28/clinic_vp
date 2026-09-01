from sqlalchemy.orm import Session

from src.database.models.views.exame_data import ExameData
from src.database.models.exame import Exame

from src.schemas.exame import ExameCreate


def select_exame(db: Session, filter_consultation_record: int | None):
    if filter_consultation_record is None:
        return db.query(ExameData).all()

    return (
        db.query(ExameData)
        .filter(ExameData.consultation_record_id == filter_consultation_record)
        .all()
    )


def insert_exame(db: Session, exame: ExameCreate):
    new_exame = Exame(**exame.model_dump())

    db.add(new_exame)
    db.flush()

    db.refresh(new_exame)

    return new_exame.id
