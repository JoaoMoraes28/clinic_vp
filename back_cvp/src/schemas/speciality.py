from pydantic import BaseModel, Field

class SpecialityBase(BaseModel):
    speciality_name: str = Field(..., max_length=50)

class SpecialityResponse(SpecialityBase):
    id: int

class SpecialityCreate(SpecialityBase):
    pass