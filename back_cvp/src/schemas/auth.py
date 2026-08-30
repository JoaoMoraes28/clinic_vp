from pydantic import BaseModel

from src.database.models.doctor import Doctor


class ResponseAuth(BaseModel):
    id: int
    name: str
    token: str


class ResponseQueryEmployee(BaseModel):
    id: int
    name: str
    password: str


class ResponseQueryAuth(BaseModel):
    role: str
    employee: ResponseQueryEmployee


class CreateAuth(BaseModel):
    email: str
    password: str


class ChangePassword(BaseModel):
    old_password: str
    new_password: str
