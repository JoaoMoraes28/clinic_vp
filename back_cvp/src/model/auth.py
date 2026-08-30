from sqlalchemy.orm import Session
from sqlalchemy import select, update

from src.database.models.admin import Admin
from src.database.models.doctor import Doctor
from src.database.models.recepcionist import Recepcionist
from src.database.connection import Base

from src.schemas.auth import CreateAuth


def valide_credentials(db: Session, datas: CreateAuth):
    script_doctor = select(Doctor.id, Doctor.name, Doctor.password).where(
        Doctor.email == datas.email
    )

    doctor = db.execute(script_doctor).mappings().first()

    if not doctor:
        script_recepcionist = select(
            Recepcionist.id, Recepcionist.name, Recepcionist.password
        ).where(Recepcionist.email == datas.email)

        recepcionist = db.execute(script_recepcionist).mappings().first()

        if not recepcionist:
            script_admin = select(Admin.id, Admin.name, Admin.password).where(
                Admin.email == datas.email
            )

            admin = db.execute(script_admin).mappings().first()

            if not admin:
                return None

            return {"role": "admin", "employee": admin}

        return {"role": "recepcionist", "employee": recepcionist}

    return {"role": "doctor", "employee": doctor}


def udpate_must_change_password(db: Session, id: str, model: type[Base]):
    script = update(model).where(model.id == id).values({"must_change_password": False})

    result = db.execute(script)
    db.flush()

    if result.rowcount == 0 or result.rowcount > 1:
        return False

    return True


def valide_old_password(db: Session, model: type[Base], id: int):
    return db.query(model).filter(model.id == id).first()


def update_password_employee(
    db: Session, model: type[Base], id: int, new_password: str
):
    script = update(model).where(model.id == id).values({"password": new_password})

    result = db.execute(script)
    db.flush()

    if result.rowcount == 0 or result.rowcount > 1:
        return False

    return True
