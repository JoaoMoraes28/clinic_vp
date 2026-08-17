from sqlalchemy.orm import Mapped, mapped_column

from datetime import date
from datetime import time

from src.database.connection import Base


class ConsultationData(Base):
    __tablename__ = "consultation_data"

    id: Mapped[int] = mapped_column(primary_key=True)

    patient_name: Mapped[str] = mapped_column()

    cpf: Mapped[str] = mapped_column()

    photo: Mapped[str] = mapped_column()

    born_date: Mapped[str] = mapped_column()

    notes: Mapped[str] = mapped_column()

    phone: Mapped[str] = mapped_column()

    doctor_name: Mapped[str] = mapped_column()

    doctor_id: Mapped[int] = mapped_column()

    speciality_name: Mapped[str] = mapped_column()

    consultation_date: Mapped[date] = mapped_column()

    hour: Mapped[time] = mapped_column()

    status: Mapped[str] = mapped_column()
