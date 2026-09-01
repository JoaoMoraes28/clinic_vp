from sqlalchemy.orm import Session
from sqlalchemy import delete

from src.database.models.contract_type import ContractType

from src.schemas.contract_type import ContractTypeCreate

def select_contract_type(db: Session):
    return db.query(ContractType).all()

def insert_contract_type(db: Session, contract: ContractTypeCreate):
    new_contract = ContractType(**contract.model_dump())

    db.add(new_contract)
    db.flush()

    db.refresh(new_contract)

    return new_contract.id

def delete_contract_type(db: Session, id: int):
    script = delete(ContractType).where(ContractType.id == id)

    result = db.execute(script)
    db.flush()

    if result.rowcount == 0:
        return False

    return True