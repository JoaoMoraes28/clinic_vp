from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from src.database.connection import Base

if TYPE_CHECKING:
    from .doctor import Doctor
    from .speciality import Speciality

class DoctorSpeciality(Base):
    __tablename__ = "doctor_speciality"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    doctor_id: Mapped[int] = mapped_column(
        ForeignKey("doctor.id"),
        nullable=False
    )

    speciality_id: Mapped[int] = mapped_column(
        ForeignKey("speciality.id"),
        nullable=False
    )

    doctor: Mapped["Doctor"] = relationship(
        back_populates="doctor_specialities"
    )

    speciality: Mapped["Speciality"] = relationship(
        back_populates="doctor_specialities"
    )