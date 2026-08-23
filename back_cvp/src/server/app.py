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
from src.routes.consultation_duration_routes import consultation_duration_routes
from src.routes.contract_type import contract_type_routes
from src.routes.consultation_routes import consultation_routes
from src.routes.consultation_record_routes import consultation_record_routes
from src.routes.measure_routes import measure_routes
from src.routes.laboratory_routes import laboratory_routes
from src.routes.exame_type_routes import exame_type_routes
from src.routes.medicine_routes import medicine_routes
from src.routes.medical_recipe_routes import medical_recipe_routes
from src.routes.exame_routes import exame_routes

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
app.include_router(consultation_duration_routes)
app.include_router(contract_type_routes)
app.include_router(consultation_routes)
app.include_router(consultation_record_routes)
app.include_router(measure_routes)
app.include_router(laboratory_routes)
app.include_router(exame_type_routes)
app.include_router(medicine_routes)
app.include_router(medical_recipe_routes)
app.include_router(exame_routes)


@app.exception_handler(IntegrityError)
async def integrity_exception_handler(request: Request, exc: IntegrityError):
    print(exc.orig)
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"error_code": "INTEGRITY_ERROR", "detail": "field invalid."},
    )


@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    print(exc)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error_code": "DATABASE_ERROR",
            "detail": "fail in comunication with database.",
        },
    )


@app.exception_handler(OperationalError)
async def sqlalchemy_exception_handler(request: Request, exc: OperationalError):
    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={
            "error_code": "CONNECTION_REFUSED",
            "detail": "could not connect to server.",
        },
    )
