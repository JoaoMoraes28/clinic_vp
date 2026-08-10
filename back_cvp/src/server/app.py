from fastapi import FastAPI, status, Request
from fastapi.responses import JSONResponse

from src.routes.patient_routes import patient_routes
from src.routes.doctor_routes import doctor_routes
from src.routes.uf_routes import uf_routes
from src.routes.recepcionist_routes import recepcionist_routes
from src.routes.speciality_routes import speciality_routes
from src.routes.doctor_speciality_routes import doctor_speciality_routes
from src.routes.week_day_routes import week_day_routes
from src.routes.doctor_day_routes import doctor_day_routes

from sqlalchemy.exc import IntegrityError, SQLAlchemyError, OperationalError

app = FastAPI()

app.include_router(patient_routes)
app.include_router(doctor_routes)
app.include_router(uf_routes)
app.include_router(recepcionist_routes)
app.include_router(speciality_routes)
app.include_router(doctor_speciality_routes)
app.include_router(week_day_routes)
app.include_router(doctor_day_routes)

@app.exception_handler(IntegrityError)
async def integrity_exception_handler(request: Request, exc: IntegrityError):
    print(exc.orig)
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "error_code": "INTEGRITY_ERROR",
            "detail": "field invalid."
        }
    )

@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    print(exc)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error_code": "DATABASE_ERROR",
            "detail": "fail in comunication with database."
        }
    )

@app.exception_handler(OperationalError)
async def sqlalchemy_exception_handler(request: Request, exc: OperationalError):
    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={
            "error_code": "CONNECTION_REFUSED",
            "detail": "could not connect to server."
        }
    )