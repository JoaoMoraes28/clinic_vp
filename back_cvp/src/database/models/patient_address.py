from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .uf import UF
    from .patient import Patient

class PatientAddress(Base):
    __tablename__ = "patient_address"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    patient_id: Mapped[int] = mapped_column(
        ForeignKey("patient.id"),
        nullable=False
    )

    uf_id: Mapped[int] = mapped_column(
        ForeignKey("uf.id"),
        nullable=False
    )

    city: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    district: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    street: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    number: Mapped[str] = mapped_column(
        String(10),
        nullable=False
    )

    cep: Mapped[str] = mapped_column(
        String(8),
        nullable=False
    )

    uf: Mapped["UF"] = relationship(
        back_populates="patient_address"
    )

    patient: Mapped["Patient"] = relationship(
        back_populates="patient_address",
        uselist=False
    )