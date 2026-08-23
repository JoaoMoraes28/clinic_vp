from pydantic import BaseModel, Field
from typing import Optional


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
    dosage: str = Field(..., max_length=255)
    notes: Optional[str] = Field(None, max_length=500)
