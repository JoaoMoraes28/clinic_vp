from sqlalchemy.orm import Session

from src.model import consultation_record_exame as consultation_record_exame_dao

from src.schemas.consultation_record_exame import ConsultationExameCreate


def registry_consultation_record_exame(
    db: Session, consultation_exame: ConsultationExameCreate
):
    consultation_record_exame_dao.insert_consultation_record_exame(
        db, consultation_exame
    )
