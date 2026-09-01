from sqlalchemy.orm import Session
from sqlalchemy import update

from src.database.models.medicine import Medicine
from src.database.models.views.medicine_data import MedicineData

from src.schemas.medicine import MedicineWrite


def select_medicine(db: Session, filter: bool | None):
    if filter is None:
        return db.query(MedicineData).all()

    return db.query(MedicineData).filter(MedicineData.active == filter).all()


def select_medicine_id(db: Session, id: int):
    return db.query(Medicine).filter(Medicine.id == id).first()


def insert_medicine(db: Session, medicine: MedicineWrite):
    new_medicine = Medicine(**medicine.model_dump())

    db.add(new_medicine)
    db.flush()

    db.refresh(new_medicine)

    return new_medicine.id


def update_medicine(db: Session, medicine_db: Medicine, new_medicine: MedicineWrite):
    update_medicine = new_medicine.model_dump(exclude_unset=True)

    for field, value in update_medicine.items():
        setattr(medicine_db, field, value)

    db.flush()


def change_status_medicine(db: Session, new_status: bool, id: int):
    script = update(Medicine).where(Medicine.id == id).values({"active": new_status})

    result = db.execute(script)
    db.flush()

    if result.rowcount == 0 or result.rowcount > 1:
        return False

    return True
