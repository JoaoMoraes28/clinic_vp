from sqlalchemy.orm import Session

from src.model import measure as measure_dao

def get_all_measure_unity(db: Session):
    return measure_dao.select_measure(db)