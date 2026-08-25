from pydantic import BaseModel, Field

class LaboratoryResponse(BaseModel):
    id: int
    laboratory_name: str
    active: bool

class LaboratoryWrite(BaseModel):
    laboratory_name: str = Field(..., max_length=100)
    active: bool = True

class LaboratoryChangeActive(BaseModel):
    active: bool