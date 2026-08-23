from pydantic import BaseModel

from datetime import date


class ExameResponse(BaseModel):
    id: int
    consultation_record_id: int
    type_exame: str
    laboratory_name: str
    priority: str
    limit_date: date


class ExameCreate(BaseModel):
    exame_type_id: int
    laboratory_id: int
    priority: str
    limit_date: date
