from sqlalchemy.orm import Mapped, mapped_column
from datetime import date
from decimal import Decimal

from src.database.connection import Base

class PatientData(Base):
    __tablename__ = "patient_data"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    name: Mapped[str] = mapped_column()

    professional: Mapped[str | None] = mapped_column()

    cpf: Mapped[str] = mapped_column()

    gender: Mapped[str] = mapped_column()

    phone: Mapped[str] = mapped_column()

    email: Mapped[str | None] = mapped_column()

    civil_state: Mapped[str] = mapped_column()

    photo: Mapped[str | None] = mapped_column()

    blood_type: Mapped[str | None] = mapped_column()

    weight: Mapped[Decimal | None] = mapped_column()

    height: Mapped[int | None] = mapped_column()

    born_date: Mapped[date] = mapped_column()

    phone_emergency: Mapped[str | None] = mapped_column()

    notes: Mapped[str | None] = mapped_column()

    record_date: Mapped[date] = mapped_column()

    active: Mapped[bool] = mapped_column()

    uf_address: Mapped[str] = mapped_column()

    city: Mapped[str] = mapped_column()

    district: Mapped[str] = mapped_column()

    street: Mapped[str] = mapped_column()

    number: Mapped[str] = mapped_column()

    cep: Mapped[str] = mapped_column()