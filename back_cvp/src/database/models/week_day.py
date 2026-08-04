from sqlalchemy import SmallInteger, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .doctor_day import DoctorDay

class WeekDay(Base):
    __tablename__ = "week_day"

    id: Mapped[int] = mapped_column(
        SmallInteger,
        primary_key=True
    )

    day: Mapped[str] = mapped_column(
        String(20),
        unique=True,
        nullable=False
    )

    doctor_days: Mapped[list["DoctorDay"]] = relationship(
        back_populates="week_day"
    )