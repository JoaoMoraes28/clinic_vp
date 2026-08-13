from pydantic import BaseModel

class ContractTypeBase(BaseModel):
    contract: str

class ContractTypeReponse(ContractTypeBase):
    id: int

class ContractTypeCreate(ContractTypeBase):
    pass