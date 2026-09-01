from sqlalchemy.orm import Session

from src.exception.exceptions import raise_not_found

from src.repositories import consultation_duration as consultation_duration_dao

from src.schemas.consultation_duration import ConsultationDurationCreate


def get_all_consultation_duration(db: Session):
    return consultation_duration_dao.select_consultation_duration(db)


def registry_consultation_duration(
    db: Session, consultation_duration: ConsultationDurationCreate
):
    new_consultation_duration_id = (
        consultation_duration_dao.insert_consultation_duration(
            db, consultation_duration
        )
    )

    db.commit()

    return new_consultation_duration_id


def udpate_consultation_duration(db: Session, new_duration: int, id: int):
    update = consultation_duration_dao.update_consultation_duration(db, new_duration, id)

    if not update:
        db.rollback()
        raise_not_found("consultation_duration", id)

    db.commit()


def delete_consultation_duration(db: Session, id: int):
    delete = consultation_duration_dao.delete_consultation_duration(db, id)

    if not delete:
        db.rollback()
        raise_not_found("consultation_duration", id)

    db.commit()
