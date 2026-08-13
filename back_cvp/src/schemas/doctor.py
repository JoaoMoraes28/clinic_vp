from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import date

from src.schemas.address import AddressWithUfId
from src.schemas.address import AddressWithUfStr


class DoctorBase(BaseModel):
    name: str = Field(..., max_length=255)
    crm: str = Field(..., max_length=10)
    cpf: str = Field(..., max_length=11)
    phone: str = Field(..., max_length=11)
    email: EmailStr
    bio: Optional[str] = None
    photo: Optional[str] = None
    status: str
    gender: str


class DoctorResponse(DoctorBase):
    id: int
    admission_date: date
    uf_crm: str = Field(..., max_length=2)
    contract: str | None


class DoctorDataResponse(BaseModel):
    doctor: DoctorResponse
    address: AddressWithUfStr


class DoctorCreateData(DoctorBase):
    crm_uf_id: int


class DoctorCreate(BaseModel):
    doctor: DoctorCreateData
    address: AddressWithUfId


class DoctorUpdateData(DoctorBase):
    crm_uf_id: int
    password: str = Field(..., max_length=10)


class DoctorUpdate(BaseModel):
    doctor: DoctorUpdateData
    address: AddressWithUfId


class DoctorReponseStatus(BaseModel):
    id: int
    status_doctor: str


class DoctorChangeStatus(BaseModel):
    new_status: str
