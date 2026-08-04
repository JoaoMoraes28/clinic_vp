from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .contract_doctor import ContractDoctor

class ContractType(Base):
    __tablename__ = "contract_type"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    contract: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False
    )

    contract_doctors: Mapped[list["ContractDoctor"]] = relationship(
        back_populates="contract_type"
    )