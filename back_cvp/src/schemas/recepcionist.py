from datetime import date
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, Field

from src.schemas.address import AddressWithUfStr
from src.schemas.address import AddressWithUfId


class RecepcionistBase(BaseModel):
    name: str = Field(..., max_length=255)
    salary: Decimal = Field(..., ge=1, decimal_places=2)
    cpf: str = Field(..., max_length=11)
    status: str
    phone: str = Field(..., max_length=11)
    email: str = Field(..., max_length=255)
    photo: Optional[str] = Field(None, max_length=255)
    gender: str


class RecepcionistResponse(RecepcionistBase):
    id: int
    admission_date: date
    must_change_password: bool


class RecepcionistCreateBaseWithPassword(RecepcionistBase):
    password: str


class RecepcionistResponseData(BaseModel):
    recepcionist: RecepcionistResponse
    address: AddressWithUfStr


class RecepcionistCreateBaseWithPassword(RecepcionistBase):
    password: str


class RecepcionistCreateNoPassword(BaseModel):
    recepcionist: RecepcionistBase
    address: AddressWithUfId


class RecepcionistCreateResponse(BaseModel):
    id: int
    name: str
    email: str
    password: str
    must_change_password: bool


class RecepcionistUpdate(BaseModel):
    recepcionist: RecepcionistBase
    address: AddressWithUfId


class RecepcionistChangeStatus(BaseModel):
    new_status: str


class RecepcionistReponseChangeStatus(BaseModel):
    id: int
    status_recepcionist: str
