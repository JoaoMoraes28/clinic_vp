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


class RecepcionistResponseData(BaseModel):
    recepcionist: RecepcionistResponse
    address: AddressWithUfStr


class RecepcionistCreate(BaseModel):
    recepcionist: RecepcionistBase
    address: AddressWithUfId


class RecepcionistUpdate(BaseModel):
    recepcionist: RecepcionistBase
    address: AddressWithUfId


class RecepcionistChangeStatus(BaseModel):
    new_status: str

class RecepcionistReponseChangeStatus(BaseModel):
    id: int
    status_recepcionist: str
