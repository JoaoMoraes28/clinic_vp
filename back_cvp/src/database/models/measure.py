from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .medicine import Medicine

class Measure(Base):
    __tablename__ = "measure"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    measure_unit: Mapped[str] = mapped_column(
        String(10),
        unique=True,
        nullable=False
    )

    medicines: Mapped[list["Medicine"]] = relationship(
        back_populates="measure"
    )