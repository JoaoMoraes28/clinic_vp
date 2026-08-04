from enum import Enum

class GenderOption(str, Enum):
    MALE = "MALE"
    FEMALE = "FEMALE"

class BloodTypeOption(str, Enum):
    A_POSITIVE = "A+"
    A_NEGATIVE = "A-"
    B_POSITIVE = "B+"
    B_NEGATIVE = "B-"
    AB_POSITIVE = "AB+"
    AB_NEGATIVE = "AB-"
    O_POSITIVE = "O+"
    O_NEGATIVE = "O-"

class CivilStateOption(str, Enum):
    SINGLE = "SINGLE"
    MARRIED = "MARRIED"
    DIVORCIED = "DIVORCIED"
    WIDOWED = "WIDOWED"
    SEPARATED = "SEPARATED"

class StatusDoctorRecepcionist(str, Enum):
    ACTIVE = "ACTIVE"
    DESACTIVE = "DESACTIVE"
    VACATION = "VACATION"
    AWAY = "AWAY"

class StatusConsultation(str, Enum):
    SCHEDULED = "SCHEDULED"
    WAITING = "WAITING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    CANCELED = "CANCELED"

class PriorityExame(str, Enum):
    NORMAL = "NORMAL"
    URGENT = "URGENT"