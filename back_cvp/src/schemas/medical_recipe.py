from pydantic import BaseModel


class MedicalRecipeResponse(BaseModel):
    id: int
    medicine_name: str
    measure_unit: str
    consultation_record_id: int
    dosage: str
    notes: str


class MedicalRecipeCreate(BaseModel):
    consultation_record_id: int
    medicine_id: int
    dosage: str
    notes: str
