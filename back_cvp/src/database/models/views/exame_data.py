from sqlalchemy.orm import Mapped, mapped_column
from datetime import date

from src.database.connection import Base


class ExameData(Base):
    __tablename__ = "exame_data"

    id: Mapped[int] = mapped_column(primary_key=True)

    consultation_id: Mapped[int] = mapped_column()

    consultation_record_id: Mapped[int] = mapped_column()

    name: Mapped[str] = mapped_column()

    type_exame: Mapped[str] = mapped_column()

    laboratory_name: Mapped[str] = mapped_column()

    priority: Mapped[str] = mapped_column()

    limit_date: Mapped[date] = mapped_column()
