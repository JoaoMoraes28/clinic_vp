from pydantic import BaseModel


class SpecialityJSON(BaseModel):
    id: int
    name: str


class DoctorSpecialityResponse(BaseModel):
    doctor_id: int
    name: str
    specialities: list[SpecialityJSON]


class DoctorSpecialityCreate(BaseModel):
    doctor_id: int
    speciality_id: int

class DoctorSpecialityDelete(DoctorSpecialityCreate):
    pass

class DoctorSpecialityDeleteResponse(BaseModel):
    message: str