from pydantic import BaseModel, Field


class MedicineResponse(BaseModel):
    id_medicine: int
    medicine_name: str
    measure_unit: str
    active: bool


class MedicineWrite(BaseModel):
    measure_id: int
    medicine_name: str = Field(..., max_length=150)
    active: bool = True


class MedicineChangeStatus(BaseModel):
    new_status: bool
