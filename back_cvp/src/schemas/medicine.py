from pydantic import BaseModel


class MedicineResponse(BaseModel):
    id_medicine: int
    medicine_name: str
    measure_unit: str
    active: bool


class MedicineWrite(BaseModel):
    measure_id: int
    medicine_name: str


class MedicineChangeStatus(BaseModel):
    new_status: bool
