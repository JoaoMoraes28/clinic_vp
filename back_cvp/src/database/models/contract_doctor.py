from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .contract_type import ContractType
    from .doctor import Doctor

class ContractDoctor(Base):
    __tablename__ = "contract_doctor"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    contract_type_id: Mapped[int] = mapped_column(
        ForeignKey("contract_type.id"),
        nullable=False
    )

    doctor_id: Mapped[int] = mapped_column(
        ForeignKey("doctor.id"),
        nullable=False
    )

    contract_type: Mapped["ContractType"] = relationship(
        back_populates="contract_doctors"
    )

    doctor: Mapped["Doctor"] = relationship(
        back_populates="contract_doctors"
    )