from datetime import date
from sqlalchemy import String, Date, Enum as SQLEnum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base
from src.database.enum.enum import StatusDoctorRecepcionist, GenderOption

if TYPE_CHECKING:
    from .doctor_speciality import DoctorSpeciality
    from .doctor_day import DoctorDay
    from .consultation_duration import ConsultationDuration
    from .contract_doctor import ContractDoctor
    from .consultation import Consultation
    from .doctor_address import DoctorAddress
    from .uf import UF

class Doctor(Base):
    __tablename__ = "doctor"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    admission_date: Mapped[date | None] = mapped_column(
        Date,
        default=date.today
    )

    crm: Mapped[str] = mapped_column(
        String(10),
        nullable=False
    )

    crm_uf_id: Mapped[int] = mapped_column(
        ForeignKey("uf.id"),
        nullable=False
    )

    cpf: Mapped[str] = mapped_column(
        String(11),
        unique=True,
        nullable=False
    )

    phone: Mapped[str] = mapped_column(
        String(11),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False
    )

    bio: Mapped[str | None] = mapped_column(
        String(500)
    )

    photo: Mapped[str | None] = mapped_column(
        String(255)
    )

    password: Mapped[str] = mapped_column(
        String(10),
        default="cvp2802",
        nullable=False
    )

    status: Mapped[StatusDoctorRecepcionist] = mapped_column(
        SQLEnum(StatusDoctorRecepcionist),
        nullable=False
    )

    gender: Mapped[GenderOption] = mapped_column(
        SQLEnum(GenderOption),
        nullable=False
    )

    doctor_specialities: Mapped[list["DoctorSpeciality"]] = relationship(
        back_populates="doctor"
    )

    doctor_days: Mapped[list["DoctorDay"]] = relationship(
        back_populates="doctor"
    )

    consultation_duration: Mapped[list["ConsultationDuration"]] = relationship(
        back_populates="doctor"
    )

    contract_doctors: Mapped[list["ContractDoctor"]] = relationship(
        back_populates="doctor"
    )

    consultations: Mapped[list["Consultation"]] = relationship(
        back_populates="doctor"
    )

    doctor_address: Mapped["DoctorAddress"] = relationship(
        back_populates="doctor"
    )

    uf: Mapped["UF"] = relationship(
        back_populates="doctor_crm"
    )