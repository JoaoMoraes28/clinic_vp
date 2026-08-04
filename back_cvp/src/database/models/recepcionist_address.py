from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .recepcionist import Recepcionist
    from .uf import UF

class RecepcionistAddress(Base):
    __tablename__ = "recepcionist_address"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    recepcionist_id: Mapped[int] = mapped_column(
        ForeignKey("recepcionist.id"),
        nullable=False
    )

    uf_id: Mapped[int] = mapped_column(
        ForeignKey("uf.id"),
        nullable=False
    )

    city: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    district: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    street: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    number: Mapped[str] = mapped_column(
        String(10),
        nullable=False
    )

    recepcionist: Mapped["Recepcionist"] = relationship(
        back_populates="recepcionist_address"
    )

    uf: Mapped["UF"] = relationship(
        back_populates="recepcionist_address"
    )