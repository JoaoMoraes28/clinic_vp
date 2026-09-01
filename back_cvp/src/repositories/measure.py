from sqlalchemy.orm import Session

from src.database.models.measure import Measure


def select_measure(db: Session):
    return db.query(Measure).order_by(Measure.measure_unit).all()
