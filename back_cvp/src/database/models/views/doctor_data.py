from sqlalchemy.orm import Mapped, mapped_column
from datetime import date

from src.database.connection import Base

class DoctorData(Base):
    __tablename__ = "doctor_data"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    name: Mapped[str] = mapped_column()

    admission_date: Mapped[date] = mapped_column()

    crm: Mapped[str] = mapped_column()

    cpf: Mapped[str] = mapped_column()

    phone: Mapped[str] = mapped_column()

    email: Mapped[str] = mapped_column()

    bio: Mapped[str | None] = mapped_column()

    photo: Mapped[str | None] = mapped_column()

    password: Mapped[str] = mapped_column()

    status: Mapped[str] = mapped_column()

    gender: Mapped[str] = mapped_column()

    uf_crm: Mapped[str] = mapped_column()

    uf_address: Mapped[str] = mapped_column()

    city: Mapped[str] = mapped_column()

    district: Mapped[str] = mapped_column()

    street: Mapped[str] = mapped_column()

    number: Mapped[str] = mapped_column()

    cep: Mapped[str] = mapped_column()