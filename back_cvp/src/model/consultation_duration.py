from sqlalchemy.orm import Session
from sqlalchemy import update, delete

from src.database.models.consultation_duration import ConsultationDuration
from src.database.models.views.consultation_duration_data import (
    ConsultationDurationData,
)

from src.schemas.consultation_duration import ConsultationDurationResponse
from src.schemas.consultation_duration import ConsultationDurationCreate


def select_consultation_duration(db: Session):
    return db.query(ConsultationDurationData).all()


def insert_consultation_duration(
    db: Session, consultation_duration: ConsultationDurationCreate
):
    new_consultation_duration = ConsultationDuration(
        **consultation_duration.model_dump()
    )

    db.add(new_consultation_duration)
    db.flush()

    db.refresh(new_consultation_duration)

    return new_consultation_duration.id


def update_consultation_duration(db: Session, new_duration: int, id: int):
    script = (
        update(ConsultationDuration)
        .where(ConsultationDuration.id == id)
        .values({"duration": new_duration})
    )

    result = db.execute(script)
    db.flush()

    if result.rowcount == 0 or result.rowcount > 1:
            return False
    
    return True


def delete_consultation_duration(db: Session, id: int):
    script = delete(ConsultationDuration).where(ConsultationDuration.id == id)

    result = db.execute(script)
    db.flush()

    if result.rowcount == 0 or result.rowcount > 1:
        return False

    return True
