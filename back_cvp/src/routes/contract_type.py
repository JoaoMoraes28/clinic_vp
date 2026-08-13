from fastapi import APIRouter, status, Depends, Path

from typing import List

from sqlalchemy.orm import Session

from src.database.connection import get_db

from src.controller import contract_type as controller_contract_type

from src.schemas.contract_type import ContractTypeCreate
from src.schemas.contract_type import ContractTypeReponse
from src.schemas.return_messages_standart import ReturnMessageStandard
from src.schemas.return_messages_standart import ReturnMessageCreateElement

contract_type_routes = APIRouter(prefix="/contract_type", tags=["Tipos de contrato"])


@contract_type_routes.get(
    "/", response_model=List[ContractTypeReponse], status_code=status.HTTP_200_OK
)
def get_contract_type(db: Session = Depends(get_db)):
    return controller_contract_type.get_all_contract_type(db)


@contract_type_routes.post(
    "/", response_model=ReturnMessageCreateElement, status_code=status.HTTP_201_CREATED
)
def post_contract_type(
    contract_type: ContractTypeCreate, db: Session = Depends(get_db)
):
    id = controller_contract_type.registry_contract_type(db, contract_type)

    return {"id": id, "element": "Contract type"}


@contract_type_routes.delete(
    "/{id_contract_type}",
    response_model=ReturnMessageStandard,
    status_code=status.HTTP_200_OK,
)
def delete_contract_type(
    id_contract_type: int = Path(..., ge=1), db: Session = Depends(get_db)
):
    controller_contract_type.delete_contract_type(db, id_contract_type)

    return {"message": f"contract_type with id {id_contract_type} deleted"}
