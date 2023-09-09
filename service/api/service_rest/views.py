import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .encoders import TechnicianEncoder, AppointmentListEncoder, AppointmentDetailEncoder
from .models import Technician, Appointment, AutomobileVO


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                {"technician": technician},
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create technician"},
                status=400,
            )
            return response


@require_http_methods(["GET", "DELETE"])
def api_detail_technician(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                {"technician": technician},
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "Technician does not exist"},
                status=404,
            )
            return response
    else:
        try:
            count, _ = Technician.objects.filter(id=id).delete()
            if count > 0:
                return JsonResponse({"delete": True})
            else:
                return JsonResponse(
                    {"message": "Technician does not exist"},
                    status=404
                    )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist"},
                status=404
                )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request, vin=False):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = content["technician"]
            technician = Technician.objects.get(id=technician)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician."},
                status=404,
            )
        try:
            vin = content["vin"]
            vip = AutomobileVO.objects.get(vin=vin)
            if vip:
                content["vip"] = True
                appointment = Appointment.objects.create(**content)
        except AutomobileVO.DoesNotExist:
            appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_detail_appointment(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Appointment does not exist"})
            response.status_code = 400
            return response
    elif request.method == "DELETE":
        try:
            count, _ = Appointment.objects.filter(id=id).delete()
            if count > 0:
                return JsonResponse({"message": "Appointment deleted"})
            else:
                return JsonResponse(
                    {"message": "Appointment does not exist"},
                    status=404
                    )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment does not exist"},
                status=404
            )
    else:
        content = json.loads(request.body)
        Appointment.objects.filter(id=id).update(**content)
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": f"Invalid appointment id: {id}"},
                status=404
            )


@require_http_methods(["PUT"])
def api_appointment_status_finished(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.status = "finished"
        appointment.save()
        return JsonResponse(
            {"message": "Appointment status updated to 'finished'",
                "status": "finished"},
            status=200
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid appointment id!"},
            status=404
        )


@require_http_methods(["PUT"])
def api_appointment_status_canceled(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.status = "canceled"
        appointment.save()
        return JsonResponse(
            {"message": "Appointment status updated to 'canceled'",
                "status": "canceled"},
            status=200
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid appointment id!"},
            status=404
        )
