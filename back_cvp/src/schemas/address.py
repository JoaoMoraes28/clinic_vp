from pydantic import BaseModel, Field

class Address(BaseModel):
    city: str = Field(..., max_length=150)
    district: str = Field(..., max_length=150)
    street: str = Field(..., max_length=150)
    number: str = Field(..., max_length=10)
    cep: str = Field(..., max_length=8)

class AddressCreateDoctor(Address):
    doctor_id: int
    uf_id: int

class AddressCreatePatient(Address):
    patient_id: int
    uf_id: int

class AddressCreateRecepcionist(Address):
    recepcionist_id: int
    uf_id: int

class AddressWithUfId(Address):
    uf_id: int