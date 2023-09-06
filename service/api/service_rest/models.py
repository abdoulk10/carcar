from django.db import models


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    employee_id = models.IntegerField()

    def __str__(self):
        return self.name


class Appointment(models.Model):
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    date_time = models.DateTimeField(null=True)
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=20, default="pending")
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.customer_name
