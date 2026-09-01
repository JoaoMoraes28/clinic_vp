from fastapi import APIRouter, status, Depends

from typing import Annotated

from sqlalchemy.orm import Session

from src.services import auth as controller_auth

from src.database.connection import get_db

from src.schemas.auth import CreateAuth
from src.schemas.auth import ResponseAuth
from src.schemas.auth import ChangePassword
from src.schemas.return_messages_standart import ReturnMessageStandard

from src.security.jwt import valide_token

auth_employee_routes = APIRouter(prefix="/auth", tags=["Autenticação"])


@auth_employee_routes.post(
    "/login", response_model=ResponseAuth, status_code=status.HTTP_200_OK
)
def post_auth(datas_employee: CreateAuth, db: Session = Depends(get_db)):
    return controller_auth.get_auth_credentials(db, datas_employee)


@auth_employee_routes.patch(
    "/password", response_model=ReturnMessageStandard, status_code=status.HTTP_200_OK
)
def patch_password_employee(
    employee: Annotated[dict, Depends(valide_token)],
    password_data: ChangePassword,
    db: Session = Depends(get_db),
):
    controller_auth.modify_password(
        db, employee["role"], int(employee["id"]), password_data
    )

    return {"message": "password updated with successful"}


@auth_employee_routes.patch(
    "/must_change_password",
    response_model=ReturnMessageStandard,
    status_code=status.HTTP_200_OK,
)
def patch_must_change_password(
    employee: Annotated[dict, Depends(valide_token)], db: Session = Depends(get_db)
):
    controller_auth.modify_status_change_password(
        db, employee["role"], int(employee["id"])
    )

    return {"message": "status modified with successful"}
