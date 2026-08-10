from pydantic import BaseModel, Field

class Uf(BaseModel):
    id: int
    abbreviation: str = Field(..., max_length=2)