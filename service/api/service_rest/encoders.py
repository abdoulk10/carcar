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
        "customer",
        "vip",
        "date_time",
        "technician",
        "reason",
        "status",
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
        "vip",
        "status",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }
