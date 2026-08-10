from pydantic import BaseModel

class SpecialityBase(BaseModel):
    speciality_name: str

class SpecialityResponse(SpecialityBase):
    id: int

class SpecialityCreate(SpecialityBase):
    pass