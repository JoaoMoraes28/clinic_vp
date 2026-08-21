from sqlalchemy.orm import Mapped, mapped_column

from datetime import time

from src.database.connection import Base


class VerifyHourConsultation(Base):
    __tablename__ = "verify_hours_doctor_consultation"

    id: Mapped[int] = mapped_column(primary_key=True)

    hour_consultation: Mapped[time] = mapped_column()

    available: Mapped[bool] = mapped_column()
