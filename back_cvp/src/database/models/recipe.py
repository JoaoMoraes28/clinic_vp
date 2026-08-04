from sqlalchemy import ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .consultation_record import ConsultationRecord
    from .medicine import Medicine

class MedicalRecipe(Base):
    __tablename__ = "medical_recipe"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    consultation_record_id: Mapped[int] = mapped_column(
        ForeignKey("consultation_record.id"),
        nullable=False
    )

    medicine_id: Mapped[int] = mapped_column(
        ForeignKey("medicine.id"),
        nullable=False
    )

    dosage: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    notes: Mapped[str | None] = mapped_column(
        String(500)
    )

    consultation_record: Mapped["ConsultationRecord"] = relationship(
        back_populates="recipes"
    )

    medicine: Mapped["Medicine"] = relationship(
        back_populates="recipes"
    )