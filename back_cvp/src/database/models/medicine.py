from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .measure import Measure
    from .recipe import MedicalRecipe

class Medicine(Base):
    __tablename__ = "medicine"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    measure_id: Mapped[int] = mapped_column(
        ForeignKey("measure.id"),
        nullable=False
    )

    medicine_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    measure: Mapped[list["Measure"]] = relationship(
        back_populates="medicines"
    )

    recipes: Mapped[list["MedicalRecipe"]] = relationship(
        back_populates="medicine"
    )