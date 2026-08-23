from pydantic import BaseModel, Field

class MeasureResponse(BaseModel):
    id: int
    measure_unit: str = Field(..., max_length=10)