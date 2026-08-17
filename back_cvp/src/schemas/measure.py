from pydantic import BaseModel

class MeasureResponse(BaseModel):
    id: int
    measure_unit: str