from sqlalchemy.orm import Session

from src.repositories import uf as uf_dao


def get_all_uf(db: Session):
    return uf_dao.select_uf(db)
