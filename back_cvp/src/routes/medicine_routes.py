from fastapi import APIRouter, status, Depends, Path

from typing import List

from sqlalchemy.orm import Session

from src.services import medicine as controller_medicine

from src.database.connection import get_db

from src.schemas.medicine import MedicineResponse
from src.schemas.medicine import MedicineWrite
from src.schemas.medicine import MedicineChangeStatus
from src.schemas.return_messages_standart import ReturnMessageStandard
from src.schemas.return_messages_standart import ReturnMessageCreateElement

from src.security.jwt import valide_access_level_doctor
from src.security.jwt import valide_access_level_admin

medicine_routes = APIRouter(prefix="/medicine", tags=["Medicamentos"])


@medicine_routes.get(
    "/",
    response_model=List[MedicineResponse],
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(valide_access_level_doctor)],
)
def get_medicine(filter: bool | None = None, db: Session = Depends(get_db)):
    return controller_medicine.get_all_medicine(db, filter)


@medicine_routes.post(
    "/",
    response_model=ReturnMessageCreateElement,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(valide_access_level_admin)],
)
def post_medicine(medicine: MedicineWrite, db: Session = Depends(get_db)):
    id = controller_medicine.registry_medicine(db, medicine)

    return {"id": id, "element": "Medicine"}


@medicine_routes.put(
    "/{id_medicine}",
    response_model=ReturnMessageStandard,
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(valide_access_level_admin)],
)
def put_medicine(
    update_medicine: MedicineWrite,
    id_medicine: int = Path(..., ge=1),
    db: Session = Depends(get_db),
):
    controller_medicine.modify_medicine(db, update_medicine, id_medicine)

    return {"message": f"medicine of id {id_medicine} update with successful"}


@medicine_routes.patch(
    "/{id_medicine}",
    response_model=ReturnMessageStandard,
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(valide_access_level_admin)],
)
def change_status_medicine(
    new_status: MedicineChangeStatus,
    id_medicine: int = Path(..., ge=1),
    db: Session = Depends(get_db),
):
    controller_medicine.modify_status_medicine(db, new_status.new_status, id_medicine)

    return {"message": f"medicine of id {id_medicine} have a new status"}
