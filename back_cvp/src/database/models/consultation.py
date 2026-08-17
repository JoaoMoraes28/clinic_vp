from datetime import date, time
from sqlalchemy import Date, Enum, ForeignKey, Time
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base
from src.database.enum.enum import StatusConsultation

if TYPE_CHECKING:
    from .doctor import Doctor
    from .medical_record import MedicalRecord
    from .patient import Patient
    from .recepcionist import Recepcionist
    from .speciality import Speciality
    from .consultation_record import ConsultationRecord

class Consultation(Base):
    __tablename__ = "consultation"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    medical_record_id: Mapped[int] = mapped_column(
        ForeignKey("medical_record.id"),
        nullable=False
    )

    patient_id: Mapped[int] = mapped_column(
        ForeignKey("patient.id"),
        nullable=False
    )

    doctor_id: Mapped[int] = mapped_column(
        ForeignKey("doctor.id"),
        nullable=False
    )

    speciality_id: Mapped[int] = mapped_column(
        ForeignKey("speciality.id"),
        nullable=False
    )

    recepcionist_id: Mapped[int] = mapped_column(
        ForeignKey("recepcionist.id"),
        nullable=False
    )

    consultation_date: Mapped[date] = mapped_column(
        Date,
        nullable=False
    )

    hour: Mapped[time] = mapped_column(
        Time,
        nullable=False
    )

    status: Mapped[StatusConsultation] = mapped_column(
        Enum(StatusConsultation),
        default=StatusConsultation.SCHEDULED,
        nullable=False
    )

    medical_record: Mapped["MedicalRecord"] = relationship(
        back_populates="consultations"
    )

    patient: Mapped["Patient"] = relationship(
        back_populates="consultations"
    )

    doctor: Mapped["Doctor"] = relationship(
        back_populates="consultations"
    )

    speciality: Mapped["Speciality"] = relationship(
        back_populates="consultations"
    )

    recepcionist: Mapped["Recepcionist"] = relationship(
        back_populates="consultations"
    )

    consultation_record: Mapped["ConsultationRecord"] = relationship(
        back_populates="consultations"
    )