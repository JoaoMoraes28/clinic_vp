from pydantic import BaseModel

class WeekDayResponse(BaseModel):
    id: int
    day: str