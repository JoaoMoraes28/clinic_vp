from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .consultation import Consultation
    from .recipe import MedicalRecipe
    from .consultation_record_exame import ConsultationRecordExame

class ConsultationRecord(Base):
    __tablename__ = "consultation_record"

    id: Mapped[int] = mapped_column(primary_key=True)
        
    consultation_id: Mapped[int] = mapped_column(
        ForeignKey("consultation.id"),
        nullable=False
    )

    syntoms: Mapped[str] = mapped_column(
        String(600),
        nullable=False
    )

    diagnosis: Mapped[str] = mapped_column(
        String(600),
        nullable=False
    )

    treatment: Mapped[str] = mapped_column(
        String(600),
        nullable=False
    )

    patient_notes: Mapped[str] = mapped_column(
        String(600),
        nullable=False
    )

    notes: Mapped[str] = mapped_column(
        String(600),
        nullable=False
    )

    consultations: Mapped["Consultation"] = relationship(
        back_populates="consultation_record"
    )

    recipes: Mapped[list["MedicalRecipe"]] = relationship(
        back_populates="consultation_record"
    )

    consultation_exame: Mapped[list["ConsultationRecordExame"]] = relationship(
        back_populates="consultation_record"
    )