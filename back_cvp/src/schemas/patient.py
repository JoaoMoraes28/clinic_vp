from pydantic import BaseModel, EmailStr, Field
from decimal import Decimal
from typing import Optional
from datetime import date

from .address import AddressWithUfStr
from .address import AddressWithUfId


class PatientBase(BaseModel):
    name: str = Field(..., max_length=255)
    professional: Optional[str] = None
    cpf: str = Field(..., min_length=11, max_length=11)
    gender: str
    phone: str = Field(..., max_length=11)
    email: Optional[EmailStr] = None
    civil_state: str
    photo: Optional[str] = None
    blood_type: Optional[str] = None
    weight: Optional[Decimal] = Field(None, ge=0, decimal_places=1)
    height: Optional[int] = None
    born_date: date
    phone_emergency: Optional[str] = None
    notes: Optional[str] = None


class PatientResponse(PatientBase):
    id: int
    record_date: date
    active: bool
    medical_record_id: int


class PatientResponseData(BaseModel):
    patient: PatientResponse
    address: AddressWithUfStr


class PatientPreview(BaseModel):
    id: int
    name: str = Field(..., max_length=255)
    cpf: str = Field(..., min_length=11, max_length=11)
    phone: str = Field(..., max_length=11)
    photo: Optional[str] = None
    medical_record_id: int


class PatientWrite(BaseModel):
    patient: PatientBase
    address: AddressWithUfId


class PatientReponseStatus(BaseModel):
    id: int
    status_patient: str
