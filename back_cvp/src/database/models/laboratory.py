from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .exame import Exame

class Laboratory(Base):
    __tablename__ = "laboratory"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    laboratory_name: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False
    )

    exames: Mapped[list["Exame"]] = relationship(
        back_populates="laboratory"
    )