from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .patient_address import PatientAddress
    from .doctor import Doctor
    from .doctor_address import DoctorAddress
    from .recepcionist_address import RecepcionistAddress
    from .admin_address import AdminAddress


class UF(Base):
    __tablename__ = "uf"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String(30), unique=True, nullable=False)

    abbreviation: Mapped[str] = mapped_column(String(2), unique=True, nullable=False)

    patient_address: Mapped[list["PatientAddress"]] = relationship(back_populates="uf")

    doctor_crm: Mapped[list["Doctor"]] = relationship(back_populates="uf")

    doctor_address: Mapped[list["DoctorAddress"]] = relationship(back_populates="uf")

    recepcionist_address: Mapped[list["RecepcionistAddress"]] = relationship(
        back_populates="uf"
    )

    admin_address: Mapped[list["AdminAddress"]] = relationship(back_populates="uf")
