from pydantic import BaseModel, Field

class ContractTypeBase(BaseModel):
    contract: str = Field(..., max_length=50)

class ContractTypeReponse(ContractTypeBase):
    id: int

class ContractTypeCreate(ContractTypeBase):
    pass