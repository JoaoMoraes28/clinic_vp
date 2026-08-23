from pydantic import BaseModel


class ConsultationExameCreate(BaseModel):
    exame_id: int
    consultation_record_id: int
