from sqlalchemy.orm import Mapped, mapped_column

from src.database.connection import Base


class MedicalRecipeData(Base):
    __tablename__ = "medical_recipe_data"

    id: Mapped[int] = mapped_column(primary_key=True)

    medicine_name: Mapped[str] = mapped_column()

    measure_unit: Mapped[str] = mapped_column()

    consultation_record_id: Mapped[int] = mapped_column()

    dosage: Mapped[str] = mapped_column()

    notes: Mapped[str] = mapped_column()
