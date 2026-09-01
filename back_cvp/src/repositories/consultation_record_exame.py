from sqlalchemy.orm import Session

from src.schemas.consultation_record_exame import ConsultationExameCreate

from src.database.models.consultation_record_exame import ConsultationRecordExame


def insert_consultation_record_exame(
    db: Session, consultation_exame: ConsultationExameCreate
):
    new_consultation_exame = ConsultationRecordExame(**consultation_exame.model_dump())

    db.add(new_consultation_exame)
