from pydantic import BaseModel, Field


class ExameTypeResponse(BaseModel):
    id: int
    type_exame: str
    active: bool


class ExameTypeWrite(BaseModel):
    type_exame: str = Field(..., max_length=150)


class ExameChangeStatus(BaseModel):
    new_status: bool
