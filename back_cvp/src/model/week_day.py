from sqlalchemy.orm import Session

from src.schemas.week_day import WeekDayResponse

from src.database.models.week_day import WeekDay


def select_week_day(db: Session):
    return db.query(WeekDay).all()
