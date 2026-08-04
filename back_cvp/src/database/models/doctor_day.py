from datetime import time
from sqlalchemy import ForeignKey, Time
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .doctor import Doctor
    from .week_day import WeekDay

class DoctorDay(Base):
    __tablename__ = "doctor_day"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    doctor_id: Mapped[int] = mapped_column(
        ForeignKey("doctor.id"),
        nullable=False
    )

    week_day_id: Mapped[int] = mapped_column(
        ForeignKey("week_day.id"),
        nullable=False
    )

    start_time: Mapped[time] = mapped_column(
        Time,
        nullable=False
    )

    end_time: Mapped[time] = mapped_column(
        Time,
        nullable=False
    )

    doctor: Mapped["Doctor"] = relationship(
        back_populates="doctor_days"
    )

    week_day: Mapped["WeekDay"] = relationship(
        back_populates="doctor_days"
    )