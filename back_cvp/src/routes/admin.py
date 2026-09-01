from fastapi import APIRouter, status, Depends, Path

from typing import List, Annotated

from sqlalchemy.orm import Session

from src.services import admin as controller_admin

from src.database.connection import get_db

from src.schemas.admin import AdminCreate
from src.schemas.admin import AdminResponse
from src.schemas.admin import AdminResponseCreate
from src.schemas.return_messages_standart import ReturnMessageStandard

from src.security.jwt import valide_access_level_admin
from src.security.jwt import valide_token

admin_routes = APIRouter(prefix="/admin", tags=["Administrador"])


@admin_routes.get(
    "/",
    response_model=List[AdminResponse],
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(valide_access_level_admin)],
)
def get_admin(db: Session = Depends(get_db)):
    return controller_admin.get_all_admin(db)


@admin_routes.get(
    "/{id_admin}",
    response_model=AdminResponse,
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(valide_access_level_admin)],
)
def get_admin_id(id_admin: int = Path(..., ge=1), db: Session = Depends(get_db)):
    return controller_admin.get_admin_id(db, id_admin)


@admin_routes.post(
    "/", response_model=AdminResponseCreate, status_code=status.HTTP_200_OK
)
def post_admin(
    new_admin: AdminCreate,
    admin: Annotated[dict, Depends(valide_token)],
    db: Session = Depends(get_db),
):
    return controller_admin.registry_admin(db, new_admin, int(admin["id"]))


@admin_routes.delete(
    "/{id_admin_delete}",
    response_model=ReturnMessageStandard,
    status_code=status.HTTP_200_OK,
)
def delete_admin(
    admin: Annotated[dict, Depends(valide_token)],
    id_admin_delete: int = Path(..., ge=1),
    db: Session = Depends(get_db),
):
    controller_admin.remove_admin(db, id_admin_delete, int(admin["id"]))

    return {"message": f"admin with id {id_admin_delete} delete with successful"}
