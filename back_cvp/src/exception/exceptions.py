from fastapi import HTTPException, status

def raise_not_found(data_name: str, id: int):
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"{data_name} with id {id} not found"
    )