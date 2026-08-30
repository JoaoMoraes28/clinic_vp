from datetime import date
from sqlalchemy import String, Date, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from typing import TYPE_CHECKING

from src.database.connection import Base
from src.database.enum.enum import GenderOption

if TYPE_CHECKING:
    from .admin_address import AdminAddress


class Admin(Base):
    __tablename__ = "admin"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String(255), nullable=False)

    admission_date: Mapped[date | None] = mapped_column(Date, default=date.today)

    cpf: Mapped[str] = mapped_column(String(11), unique=True, nullable=False)

    phone: Mapped[str] = mapped_column(String(11), nullable=False)

    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)

    photo: Mapped[str | None] = mapped_column(String(255))

    password: Mapped[str] = mapped_column(String(255), nullable=False)

    gender: Mapped[GenderOption] = mapped_column(SQLEnum(GenderOption), nullable=False)

    primary_admin: Mapped[bool] = mapped_column(nullable=False, default=False)

    must_change_password: Mapped[bool] = mapped_column(default=True)

    admin_address: Mapped["AdminAddress"] = relationship(back_populates="admin")
