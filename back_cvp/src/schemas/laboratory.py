from pydantic import BaseModel

class LaboratoryResponse(BaseModel):
    id: int
    laboratory_name: str
    active: bool

class LaboratoryWrite(BaseModel):
    laboratory_name: str

class LaboratoryChangeActive(BaseModel):
    active: bool