from fastapi import APIRouter, status, Depends

from typing import List

from sqlalchemy.orm import Session

from src.controller import measure as controller_measure

from src.database.connection import get_db

from src.schemas.measure import MeasureResponse

measure_routes = APIRouter(prefix="/measure", tags=["Unidades de medida"])


@measure_routes.get(
    "/", response_model=List[MeasureResponse], status_code=status.HTTP_200_OK
)
def get_meaure(db: Session = Depends(get_db)):
    return controller_measure.get_all_measure_unity(db)
