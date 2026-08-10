from sqlalchemy.orm import Session

from src.model.week_day import select_week_day


def get_all_week_days(db: Session):
    return select_week_day(db)
