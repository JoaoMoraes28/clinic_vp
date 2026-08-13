from sqlalchemy.orm import Session

from src.exception.exceptions import raise_not_found

from src.model import contract_type as contract_type_dao

from src.schemas.contract_type import ContractTypeCreate

def get_all_contract_type(db: Session):
    return contract_type_dao.select_contract_type(db)

def registry_contract_type(db: Session, contract: ContractTypeCreate):
    new_contract = contract_type_dao.insert_contract_type(db, contract)

    db.commit()

    return new_contract

def delete_contract_type(db: Session, id: int):
    delete = contract_type_dao.delete_contract_type(db, id)

    if not delete:
        raise_not_found("contract_type", id)

    db.commit()