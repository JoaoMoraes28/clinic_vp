from sqlalchemy.orm import Mapped, mapped_column

from src.database.connection import Base


class MedicineData(Base):
    __tablename__ = "medicine_data"

    id_medicine: Mapped[int] = mapped_column(primary_key=True)

    medicine_name: Mapped[str] = mapped_column()

    active: Mapped[bool] = mapped_column()

    measure_unit: Mapped[str] = mapped_column()
