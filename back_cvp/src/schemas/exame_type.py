from pydantic import BaseModel


class ExameTypeResponse(BaseModel):
    id: int
    type_exame: str
    active: bool


class ExameTypeWrite(BaseModel):
    type_exame: str


class ExameChangeStatus(BaseModel):
    new_status: bool
