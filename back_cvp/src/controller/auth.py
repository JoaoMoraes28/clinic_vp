from sqlalchemy.orm import Session

from src.model import auth as auth_dao

from src.exception.exceptions import raise_invalid_credentials

from src.security.jwt import create_access_token

from src.schemas.auth import CreateAuth
from src.schemas.auth import ResponseQueryAuth
from src.schemas.auth import ChangePassword

from src.database.models.doctor import Doctor
from src.database.models.recepcionist import Recepcionist
from src.database.models.admin import Admin
from src.database.connection import Base

from src.exception.exceptions import raise_invalid_credentials
from src.exception.exceptions import raise_error_data_base
from src.exception.exceptions import raise_not_found

from src.security.password_hash import verify_password_hash
from src.security.password_hash import hash_password


def get_auth_credentials(db: Session, datas: CreateAuth):
    result: ResponseQueryAuth = auth_dao.valide_credentials(db, datas)

    if result is None:
        raise_invalid_credentials()

    verify_pass = verify_password_hash(datas.password, result["employee"]["password"])

    if not verify_pass:
        raise_invalid_credentials()

    token = create_access_token(
        result["employee"]["id"], result["role"], result["employee"]["name"]
    )

    return {
        "id": result["employee"]["id"],
        "name": result["employee"]["name"],
        "token": token,
    }


def verify_old_password(db: Session, id: int, model: type[Base]):
    return auth_dao.valide_old_password(db, model, id)


def modify_password(db: Session, role: str, id: int, passwords: ChangePassword):
    try:
        model_base = (
            Doctor
            if role == "doctor"
            else Recepcionist if role == "recepcionist" else Admin
        )

        employee_verification = verify_old_password(db, id, model_base)

        if employee_verification is None:
            raise_not_found("employee's", id)

        result_password_verification = verify_password_hash(
            passwords.old_password, employee_verification.password
        )

        if not result_password_verification:
            raise_invalid_credentials()

        result_udpate_password = auth_dao.update_password_employee(
            db, model_base, id, hash_password(passwords.new_password)
        )

        if not result_udpate_password:
            raise_error_data_base()

        db.commit()

    except Exception:
        db.rollback()
        raise


def modify_status_change_password(db: Session, role: str, id: int):
    model_base = (
        Doctor
        if role == "doctor"
        else Recepcionist if role == "recepcionist" else Admin
    )

    result = auth_dao.udpate_must_change_password(db, id, model_base)

    if not result:
        raise_not_found("employee's", id)

    db.commit()
