from pydantic import BaseModel, Field

from datetime import date

class ConsultationRecordBase(BaseModel):
    syntoms: str = Field(..., max_length=600)
    diagnosis: str = Field(..., max_length=600)
    treatment: str = Field(..., max_length=600)
    patient_notes: str = Field(..., max_length=600)
    notes: str | None


class ConsultationRecordCreate(ConsultationRecordBase):
    consultation_id: int


class ConsultationRecordResponse(BaseModel):
    consultation_record_id: int
    consultation_id: int
    medical_record_id: int
    patient_id: int
    consultation_date: date
    doctor_name: str
    speciality_name: str
    syntoms: str
    diagnosis: str
    treatment: str
    patient_notes: str