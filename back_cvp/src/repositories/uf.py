from sqlalchemy.orm import Session

from src.database.models.uf import UF

def select_uf(db: Session):
    return db.query(UF.id, UF.abbreviation).all()