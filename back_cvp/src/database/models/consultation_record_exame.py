from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .exame import Exame
    from .consultation_record import ConsultationRecord

class ConsultationRecordExame(Base):
    __tablename__ = "consultation_record_exame"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    exame_id: Mapped[int] = mapped_column(
        ForeignKey("exame.id"),
        nullable=False
    )

    consultation_record_id: Mapped[int] = mapped_column(
        ForeignKey("consultation_record.id"),
        nullable=False
    )

    exame: Mapped["Exame"] = relationship(
        back_populates="consultation_exame"
    )

    consultation_record: Mapped["ConsultationRecord"] = relationship(
        back_populates="consultation_exame"
    )