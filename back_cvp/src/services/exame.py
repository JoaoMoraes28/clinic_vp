from sqlalchemy.orm import Session

from src.repositories import exame as exame_dao

from src.services import (
    consultation_record_exame as controller_consultation_record_exame,
)

from src.schemas.exame import ExameCreate
from src.schemas.consultation_record_exame import ConsultationExameCreate


def get_all_exames(db: Session, filter_consultation: int | None):
    return exame_dao.select_exame(db, filter_consultation)


def registry_exame(db: Session, exame: ExameCreate, id_consultation_record: int):
    try:
        id_exame = exame_dao.insert_exame(db, exame)

        consultation_exame = ConsultationExameCreate(
            exame_id=id_exame, consultation_record_id=id_consultation_record
        )

        controller_consultation_record_exame.registry_consultation_record_exame(
            db, consultation_exame
        )

        db.commit()

        return id_exame

    except Exception:
        db.rollback()
        raise
