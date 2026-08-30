from sqlalchemy.orm import Session

from src.model import admin as admin_dao

from src.database.models.admin_address import AdminAddress

from src.schemas.admin import AdminCreate
from src.schemas.admin import AdminBaseCreate
from src.schemas.admin import AdminResponseCreate
from src.schemas.admin import AdminBaseResponse
from src.schemas.admin import AdminResponse
from src.schemas.address import AddressWithUfStr

from src.schemas.address import AddressCreateAdmin

from src.controller import address as address_controller

from src.exception.exceptions import raise_not_found
from src.exception.exceptions import raise_not_access

from src.security.password_hash import hash_password

from .password import password_initial


def get_all_admin(db: Session):
    admins = admin_dao.select_admin(db)

    return build_admin_response(admins)


def get_admin_id(db: Session, id: int):
    admin = admin_dao.select_admin_id(db, id)

    if not admin:
        raise_not_found("admin", id)

    return build_admin_response(admin)


def get_admin_id_entity(db: Session, id: int):
    admin = admin_dao.select_admin_entity(db, id)

    if not admin:
        raise_not_found("admin", id)

    return admin


def registry_admin(db: Session, admin: AdminCreate, id_creator_admin: int):
    try:
        verify_primary_admin = get_admin_id_entity(db, id_creator_admin)

        if not verify_primary_admin.primary_admin:
            raise_not_access()

        insert_admin = AdminBaseCreate(
            password=hash_password(password_initial), **admin.admin.model_dump()
        )

        id_admin = admin_dao.insert_admin(db, insert_admin)

        insert_address = AddressCreateAdmin(
            admin_id=id_admin, **admin.address.model_dump()
        )

        address_controller.register_address(db, insert_address, AdminAddress)

        new_admin = get_admin_id_entity(db, id_admin)

        response_admin = AdminResponseCreate(
            id=new_admin.id,
            name=new_admin.name,
            email=new_admin.email,
            password=password_initial,
            must_change_password=new_admin.must_change_password,
            primary_admin=new_admin.primary_admin,
        )

        db.commit()

        return response_admin

    except Exception:
        db.rollback()
        raise


def remove_admin(db: Session, id_delete: int, id_creator_admin: int):
    verify_primary_admin = get_admin_id_entity(db, id_creator_admin)

    if not verify_primary_admin.primary_admin:
        raise_not_access()

    result = admin_dao.delete_admin(db, id_delete)

    if not result:
        raise_not_found("admin", id_delete)

    db.commit()


def build_admin_response(admin):
    if isinstance(admin, list):

        _admins = []

        for _admin in admin:
            new_JSON = AdminResponse(
                admin=AdminBaseResponse(
                    id=_admin.id,
                    name=_admin.name,
                    admission_date=_admin.admission_date,
                    cpf=_admin.cpf,
                    phone=_admin.phone,
                    email=_admin.email,
                    photo=_admin.photo,
                    gender=_admin.gender,
                    must_change_password=_admin.must_change_password,
                    primary_admin=_admin.primary_admin,
                ),
                address=AddressWithUfStr(
                    uf_address=_admin.uf_address,
                    city=_admin.city,
                    district=_admin.district,
                    street=_admin.street,
                    number=_admin.number,
                    cep=_admin.cep,
                ),
            )

            _admins.append(new_JSON)

        return _admins

    new_JSON = AdminResponse(
        admin=AdminBaseResponse(
            id=admin.id,
            name=admin.name,
            admission_date=admin.admission_date,
            cpf=admin.cpf,
            phone=admin.phone,
            email=admin.email,
            photo=admin.photo,
            gender=admin.gender,
            must_change_password=admin.must_change_password,
            primary_admin=admin.primary_admin,
        ),
        address=AddressWithUfStr(
            uf_address=admin.uf_address,
            city=admin.city,
            district=admin.district,
            street=admin.street,
            number=admin.number,
            cep=admin.cep,
        ),
    )

    return new_JSON
