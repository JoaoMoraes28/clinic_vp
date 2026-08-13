from sqlalchemy.orm import Mapped, mapped_column

from src.database.connection import Base

class ConsultationDurationData(Base):
    __tablename__ = "consultation_duration_data"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    name: Mapped[str] = mapped_column()

    duration: Mapped[int] = mapped_column()
