from pydantic import BaseModel

from datetime import time

class WeekDayJSONBase(BaseModel):
    id: int
    day: str
    start_time: time
    end_time: time

class DoctorDayReponse(BaseModel):
    doctor_id: int
    name: str
    day_hour: list[WeekDayJSONBase]

class DoctorDayCreate(BaseModel):
    doctor_id: int
    week_day_id: int
    start_time: time
    end_time: time