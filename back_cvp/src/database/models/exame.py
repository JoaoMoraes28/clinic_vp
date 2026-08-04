from datetime import date
from sqlalchemy import Date, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base
from src.database.enum.enum import PriorityExame

if TYPE_CHECKING:
    from .exame_type import ExameType
    from .laboratory import Laboratory
    from .consultation_record_exame import ConsultationRecordExame

class Exame(Base):
    __tablename__ = "exame"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    
    exame_type_id: Mapped[int] = mapped_column(
        ForeignKey("exame_type.id"),
        nullable=False
    )

    laboratory_id: Mapped[int] = mapped_column(
        ForeignKey("laboratory.id"),
        nullable=False
    )

    priority: Mapped[PriorityExame] = mapped_column(
        Enum(PriorityExame),
        nullable=False
    )

    limit_date: Mapped[date] = mapped_column(
        Date,
        nullable=False
    )

    exame_type: Mapped["ExameType"] = relationship(
        back_populates="exames"
    )

    laboratory: Mapped["Laboratory"] = relationship(
        back_populates="exames"
    )

    consultation_exame: Mapped["ConsultationRecordExame"] = relationship(
        back_populates="exame"
    )