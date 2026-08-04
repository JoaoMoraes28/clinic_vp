from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .doctor import Doctor

class ConsultationDuration(Base):
    __tablename__ = "consultation_duration"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    doctor_id: Mapped[int] = mapped_column(
        ForeignKey("doctor.id"),
        nullable=False
    )

    duration: Mapped[int] = mapped_column(
        nullable=False
    )

    doctor: Mapped["Doctor"] = relationship(
        back_populates="consultation_duration"
    )