from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .patient import Patient
    from .consultation import Consultation

class MedicalRecord(Base):
    __tablename__ = "medical_record"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    patient_id: Mapped[int] = mapped_column(
        ForeignKey("patient.id"),
        nullable=False
    )

    patient: Mapped["Patient"] = relationship(
        back_populates="medical_record"
    )

    consultations: Mapped[list["Consultation"]] = relationship(
        back_populates="medical_record"
    )