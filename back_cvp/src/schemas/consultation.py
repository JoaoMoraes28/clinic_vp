from pydantic import BaseModel

from datetime import date
from datetime import time


class ConsultationCreate(BaseModel):
    medical_record_id: int
    patient_id: int
    doctor_id: int
    speciality_id: int
    recepcionist_id: int
    consultation_date: date
    hour: time


class ConsultationResponse(BaseModel):
    id: int
    patient_name: str
    cpf: str
    photo: str | None
    born_date: date
    notes: str | None
    phone: str
    doctor_name: str
    speciality_name: str
    consultation_date: date
    hour: time
    status: str


class ConsultationResponsePreview(BaseModel):
    id: int
    patient_name: str
    doctor_name: str
    hour: time
    speciality_name: str
    status: str


class ConsultationResponseAccess(ConsultationResponsePreview):
    cpf: str
    phone: str
    consultation_date: date


class ConsultationResponseDoctor(BaseModel):
    id: int
    hour: time
    status: str
    photo: str | None
    patient_name: str
    born_date: date
    notes: str | None
    speciality_name: str


class VerfifyHourConsultationResponse(BaseModel):
    id: int
    hour_consultation: time
    available: bool


class VerfifyHourConsultationJSONConsult(BaseModel):
    id_doctor: int
    date: date


class ConsultationNewStatus(BaseModel):
    new_status: str
