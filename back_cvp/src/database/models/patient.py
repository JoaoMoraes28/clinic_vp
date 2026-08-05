from datetime import date
from decimal import Decimal
from sqlalchemy import Date, Enum, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base
from src.database.enum.enum import BloodTypeOption, CivilStateOption, GenderOption

if TYPE_CHECKING:
    from .medical_record import MedicalRecord
    from .consultation import Consultation
    from .patient_address import PatientAddress

class Patient(Base):
    __tablename__ = "patient"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    professional: Mapped[str | None] = mapped_column(
        String(255)
    )

    cpf: Mapped[str] = mapped_column(
        String(11),
        unique=True,
        nullable=False
    )

    gender: Mapped[GenderOption] = mapped_column(
        Enum(GenderOption),
        nullable=False
    )

    phone: Mapped[str] = mapped_column(
        String(11),
        nullable=False
    )

    email: Mapped[str | None] = mapped_column(
        String(255)
    )

    civil_state: Mapped[CivilStateOption] = mapped_column(
        Enum(CivilStateOption),
        nullable=False
    )

    photo: Mapped[str | None] = mapped_column(
        String(255)
    )

    blood_type: Mapped[BloodTypeOption | None] = mapped_column(
        Enum(BloodTypeOption)
    )

    weight: Mapped[Decimal | None] = mapped_column(
        Numeric(4, 1)
    )

    height: Mapped[int | None]

    born_date: Mapped[date] = mapped_column(
        Date,
        nullable=False
    )

    phone_emergency: Mapped[str | None] = mapped_column(
        String(11)
    )

    notes: Mapped[str | None] = mapped_column(
        String(500)
    )

    record_date: Mapped[date] = mapped_column(
        Date,
        default=date.today
    )

    active: Mapped[bool] = mapped_column(
        default=True,
        nullable=False
    )

    patient_address: Mapped["PatientAddress"] = relationship(
        back_populates="patient",
        uselist=False
    )

    medical_record: Mapped["MedicalRecord"] = relationship(
        back_populates="patient",
        uselist=False
    )

    consultations: Mapped[list["Consultation"]] = relationship(
        back_populates="patient"
    )