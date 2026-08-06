from pydantic import BaseModel, EmailStr, Field
from decimal import Decimal
from typing import Optional
from datetime import date

from .address import Address
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
        
class PatientResponseData(PatientBase, Address):
    id: int
    record_date: date
    active: bool
    uf: str

    class Config:
        from_attributes = True

class PatientWrite(BaseModel):
    patient: PatientBase
    address: AddressWithUfId