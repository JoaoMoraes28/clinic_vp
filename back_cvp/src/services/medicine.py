from sqlalchemy.orm import Session

from src.exception.exceptions import raise_not_found

from src.repositories import medicine as medicine_dao

from src.schemas.medicine import MedicineWrite


def get_all_medicine(db: Session, filter: bool | None):
    return medicine_dao.select_medicine(db, filter)


def get_medicine_id(db: Session, id: int):
    medicine = medicine_dao.select_medicine_id(db, id)

    if not medicine:
        raise_not_found("medicine", id)

    return medicine


def registry_medicine(db: Session, medicine: MedicineWrite):
    new_medicine_id = medicine_dao.insert_medicine(db, medicine)

    db.commit()

    return new_medicine_id


def modify_medicine(db: Session, new_medicine: MedicineWrite, id: int):
    medicine_db = get_medicine_id(db, id)

    medicine_dao.update_medicine(db, medicine_db, new_medicine)

    db.commit()


def modify_status_medicine(db: Session, new_status: bool, id: int):
    result = medicine_dao.change_status_medicine(db, new_status, id)

    if not result:
        raise_not_found("medicine", id)

    db.commit()
