from sqlalchemy.orm import Mapped, mapped_column
from datetime import date
from decimal import Decimal

from src.database.connection import Base


class RecepcionistData(Base):
    __tablename__ = "recepcionist_data"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column()

    admission_date: Mapped[date] = mapped_column()

    salary: Mapped[Decimal] = mapped_column()

    must_change_password: Mapped[bool] = mapped_column()

    cpf: Mapped[str] = mapped_column()

    status: Mapped[str] = mapped_column()

    phone: Mapped[str] = mapped_column()

    email: Mapped[str] = mapped_column()

    photo: Mapped[str | None] = mapped_column()

    gender: Mapped[str] = mapped_column()

    uf_address: Mapped[str] = mapped_column()

    city: Mapped[str] = mapped_column()

    district: Mapped[str] = mapped_column()

    street: Mapped[str] = mapped_column()

    number: Mapped[str] = mapped_column()

    cep: Mapped[str] = mapped_column()
