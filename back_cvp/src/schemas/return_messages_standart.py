from pydantic import BaseModel

class ReturnMessageStandard(BaseModel):
    message: str

class ReturnMessageCreateElement(BaseModel):
    id: int
    element: str