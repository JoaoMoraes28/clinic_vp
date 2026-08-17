from sqlalchemy.orm import Mapped, mapped_column

from src.database.connection import Base

from typing import Optional

from datetime import date


class ConsultationRecordHistory(Base):
    __tablename__ = "consultation_record_history"

    consultation_id: Mapped[int] = mapped_column(primary_key=True)

    medical_record_id: Mapped[int] = mapped_column()

    patient_id: Mapped[int] = mapped_column()

    consultation_date: Mapped[date] = mapped_column()

    doctor_name: Mapped[str] = mapped_column()

    speciality_name: Mapped[str] = mapped_column()

    syntoms: Mapped[str] = mapped_column()

    diagnosis: Mapped[str] = mapped_column()

    treatment: Mapped[str] = mapped_column()

    patient_notes: Mapped[str] = mapped_column()
