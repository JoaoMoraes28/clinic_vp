import jwt

from jwt.exceptions import InvalidTokenError

from typing import Annotated

from datetime import datetime, timedelta, timezone

from src.security.config import settings

from src.exception.exceptions import raise_invalid_token
from src.exception.exceptions import raise_not_access

from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends

oauth2_schema = OAuth2PasswordBearer(tokenUrl="/auth/login")


def create_access_token(user_id: int, role: str, user_name: str):

    issued_date_time = datetime.now(timezone.utc)

    payload = {
        "sub": str(user_id),
        "role": role,
        "name": user_name,
        "iat": issued_date_time,
        "exp": issued_date_time + timedelta(minutes=30),
    }

    return jwt.encode(payload, settings.secret_key, algorithm="HS256")


def valide_token(token: Annotated[str, Depends(oauth2_schema)]):
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms="HS256")

        employee_id = payload.get("sub")
        employee_role = payload.get("role")

        if employee_id is None or employee_role is None:
            raise_invalid_token()

        return {"id": employee_id, "role": employee_role}

    except InvalidTokenError:
        raise_invalid_token()


def valide_access_level_doctor(current_employee = Depends(valide_token)):
    if current_employee["role"] not in ("doctor", "admin"):
        raise_not_access()


def valide_access_level_recepcionist(current_employee = Depends(valide_token)):
    if current_employee["role"] not in ("recepcionist", "admin"):
        raise_not_access()


def valide_access_level_admin(current_employee = Depends(valide_token)):
    if not current_employee["role"] == "admin":
        raise_not_access()
