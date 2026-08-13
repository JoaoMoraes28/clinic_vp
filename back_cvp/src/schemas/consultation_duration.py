from pydantic import BaseModel

class ConsultationDurationBase(BaseModel):
    name: str
    duration: int

class ConsultationDurationResponse(ConsultationDurationBase):
    id: int

class ConsultationDurationCreate(BaseModel):
    doctor_id: int
    duration: int

class ConsultationDurationUpdate(BaseModel):
    new_duration: int