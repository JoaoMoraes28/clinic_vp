from datetime import date
from decimal import Decimal
from sqlalchemy import Date, Enum, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base
from src.database.enum.enum import StatusDoctorRecepcionist, GenderOption

if TYPE_CHECKING:
    from .consultation import Consultation
    from .recepcionist_address import RecepcionistAddress

class Recepcionist(Base):
    __tablename__ = "recepcionist"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    admission_date: Mapped[date] = mapped_column(
        Date,
        default=date.today
    )

    salary: Mapped[Decimal] = mapped_column(
        Numeric(6, 2),
        nullable=False
    )

    cpf: Mapped[str] = mapped_column(
        String(11),
        unique=True,
        nullable=False
    )

    status: Mapped[StatusDoctorRecepcionist] = mapped_column(
        Enum(StatusDoctorRecepcionist),
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

    photo: Mapped[str | None] = mapped_column(
        String(255)
    )

    password: Mapped[str] = mapped_column(
        String(10),
        default="cvp2802",
        nullable=False
    )

    gender: Mapped[GenderOption] = mapped_column(
        Enum(GenderOption),
        nullable=False
    )

    recepcionist_address: Mapped["RecepcionistAddress"] = relationship(
        back_populates="recepcionist"
    )

    consultations: Mapped[list["Consultation"]] = relationship(
        back_populates="recepcionist"
    )