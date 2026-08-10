from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import JSONB

from src.database.connection import Base


class DoctorSpecialityData(Base):
    __tablename__ = "doctor_speciality_data"

    doctor_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    specialities: Mapped[list[dict]] = mapped_column(JSONB)
