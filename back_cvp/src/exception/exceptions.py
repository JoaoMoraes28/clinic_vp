from fastapi import HTTPException, status


def raise_not_found(data_name: str, id: int | str = "[all]"):
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"{data_name} with id {id} not found",
    )


def raise_error_data_base():
    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="error in database",
    )


def raise_invalid_token():
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="invalid token"
    )


def raise_invalid_credentials():
    raise HTTPException(status_code=401, detail="credentials invalid")


def raise_not_access():
    raise HTTPException(status_code=403, detail="access not allowed")
