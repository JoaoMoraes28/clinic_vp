from sqlalchemy.orm import Session
from sqlalchemy import delete

from src.database.models.admin import Admin
from src.database.models.views.admin_data import AdminData

from src.schemas.admin import AdminBaseCreate


def select_admin(db: Session):
    return db.query(AdminData).all()


def select_admin_id(db: Session, id: int):
    return db.query(AdminData).filter(AdminData.id == id).first()


def select_admin_entity(db: Session, id: int):
    return db.query(Admin).filter(Admin.id == id).first()


def insert_admin(db: Session, admin: AdminBaseCreate):
    new_admin = Admin(**admin.model_dump())

    db.add(new_admin)
    db.flush()

    db.refresh(new_admin)

    return new_admin.id


def delete_admin(db: Session, id: int):
    script = delete(Admin).where(Admin.id == id)

    result = db.execute(script)
    db.flush()

    if result.rowcount == 0 or result.rowcount > 1:
        return False

    return True
