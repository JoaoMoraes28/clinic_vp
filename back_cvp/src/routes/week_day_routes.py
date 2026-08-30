from fastapi import APIRouter, status, Depends

from sqlalchemy.orm import Session

from typing import List

from src.database.connection import get_db

from src.controller.week_day import get_all_week_days

from src.schemas.week_day import WeekDayResponse

from src.security.jwt import valide_token

week_day_routes = APIRouter(prefix="/week_day", tags=["Dias da Semana"])


@week_day_routes.get(
    "/",
    response_model=List[WeekDayResponse],
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(valide_token)],
)
def get_week_days(db: Session = Depends(get_db)):
    return get_all_week_days(db)
