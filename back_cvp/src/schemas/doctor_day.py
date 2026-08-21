from pydantic import BaseModel

from datetime import date, time


class WeekDayJSONBase(BaseModel):
    id: int
    id_day: int
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


class DaysAvailableConsultation(BaseModel):
    day: str
    consultation_date: date


class ResponseDaysAvailabelConsultation(BaseModel):
    doctor_id: int
    name: str
    dates: list[DaysAvailableConsultation]
