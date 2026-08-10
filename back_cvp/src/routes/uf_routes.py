from typing import List

from fastapi import APIRouter, status, Depends

from sqlalchemy.orm import Session

from src.database.connection import get_db

from src.controller.uf import get_all_uf

from src.schemas.uf import Uf

uf_routes = APIRouter(prefix="/uf", tags=["UF"])

@uf_routes.get("/", response_model=List[Uf], status_code=status.HTTP_200_OK)
def get_uf(db: Session = Depends(get_db)):
    return get_all_uf(db)
