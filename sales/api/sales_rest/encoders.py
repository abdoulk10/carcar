from common.json import ModelEncoder
from .models import Sale, AutomobileVO, Customer, Salesperson


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "employee_id",
        "first_name",
        "last_name",
    ]


class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonListEncoder(),
        "customer": CustomerListEncoder(),
    }
