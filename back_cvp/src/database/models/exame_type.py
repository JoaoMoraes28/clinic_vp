from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .exame import Exame


class ExameType(Base):
    __tablename__ = "exame_type"

    id: Mapped[int] = mapped_column(primary_key=True)

    type_exame: Mapped[str] = mapped_column(String(150), unique=True, nullable=False)

    active: Mapped[bool] = mapped_column(nullable=False)

    exames: Mapped[list["Exame"]] = relationship(back_populates="exame_type")
