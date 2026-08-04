from src.database.connection import SessionLocal
from src.database.models.patient import Patient 

db = SessionLocal()

async def get_patients():
    patients = db.query(Patient).all()
    return patients