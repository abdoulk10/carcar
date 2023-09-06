from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment,
    properties = [
        "vin",
        "customer",
        "date_time",
        "reason",
        "status",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }
