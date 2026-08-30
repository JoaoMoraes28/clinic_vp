from pydantic import BaseModel, Field

from typing import Optional

from datetime import date

from .address import AddressWithUfStr
from .address import AddressWithUfId


class AdminBase(BaseModel):
    name: str = Field(..., max_length=255)
    cpf: str = Field(..., max_length=11)
    phone: str = Field(..., max_length=11)
    email: str = Field(..., max_length=255)
    photo: Optional[str] = Field(None, max_length=255)
    gender: str


class AdminBaseResponse(AdminBase):
    id: int
    admission_date: date
    primary_admin: bool
    must_change_password: bool


class AdminResponse(BaseModel):
    admin: AdminBaseResponse
    address: AddressWithUfStr


class AdminBaseCreate(AdminBase):
    password: str = Field(..., max_length=255)
    pass


class AdminCreate(BaseModel):
    admin: AdminBase
    address: AddressWithUfId


class AdminResponseCreate(BaseModel):
    id: int
    name: str
    email: str
    password: str
    must_change_password: bool
    primary_admin: bool
