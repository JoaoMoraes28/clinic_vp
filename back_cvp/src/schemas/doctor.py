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
    must_change_password: bool


class DoctorDataResponse(BaseModel):
    doctor: DoctorResponse
    address: AddressWithUfStr


class DoctorCreateDataNoPassword(DoctorBase):
    crm_uf_id: int


class DoctorCreateDataWithPassword(DoctorBase):
    crm_uf_id: int
    password: str


class DoctorCreateWithPassword(BaseModel):
    doctor: DoctorCreateDataWithPassword
    address: AddressWithUfId


class DoctorCreateNoPassword(BaseModel):
    doctor: DoctorCreateDataNoPassword
    address: AddressWithUfId


class DoctorResponseCreate(BaseModel):
    id: int
    name: str
    email: str
    password: str
    must_change_password: bool


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
