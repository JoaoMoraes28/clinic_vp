from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .doctor_speciality import DoctorSpeciality
    from .consultation import Consultation

class Speciality(Base):
    __tablename__ = "speciality"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    speciality_name: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    doctor_specialities: Mapped[list["DoctorSpeciality"]] = relationship(
        back_populates="speciality"
    )

    consultations: Mapped[list["Consultation"]] = relationship(
        back_populates="speciality"
    )