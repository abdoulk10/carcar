from django.urls import path
from .views import api_list_technicians, api_list_appointments, api_detail_appointment, api_detail_technician, api_appointment_status_finished, api_appointment_status_canceled

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_technicians"),
    path("technicians/<int:id>/", api_detail_technician, name="api_detail_technician"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:id>/", api_detail_appointment, name="api_detail_appointment"),
    path("appointments/<int:id>/finish/", api_appointment_status_finished, name="api_appointment_status_finish"),
    path("appointments/<int:id>/cancel/", api_appointment_status_canceled, name="api_appointment_status_canceled"),
]
