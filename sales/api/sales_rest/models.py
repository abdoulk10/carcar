from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.PositiveIntegerField(primary_key=True)


class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.TextField()
    phone_number = models.CharField(max_length=20)


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        Salesperson,
        default='',
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        default='',
        on_delete=models.CASCADE
    )
    price = models.DecimalField(max_digits=10, decimal_places=2)
