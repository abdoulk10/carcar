import json

from .encoders import SaleListEncoder, CustomerListEncoder, SalespersonListEncoder

from .models import Sale, AutomobileVO, Salesperson, Customer

from django.http import JsonResponse

from django.views.decorators.http import require_http_methods


@require_http_methods(["GET", "POST", "DELETE"])
def api_list_sales(request, id=None):
    if request.method == "GET":
        sales = Sale.objects.all()
        """if not sales:
            return JsonResponse(
                {"message": "No sales found"},
                status=404,
            )"""

        sales_data = []
        for sale in sales:
            serialized_sale = {
                "id": sale.id,
                "automobile": {
                    "vin": sale.automobile.vin,
                    "sold": sale.automobile.sold,
                },
                "salesperson": {
                    "employee_id": sale.salesperson.employee_id,
                    "first_name": sale.salesperson.first_name,
                    "last_name": sale.salesperson.last_name,
                },
                "customer": {
                    "id": sale.customer.id,
                    "first_name": sale.customer.first_name,
                    "last_name": sale.customer.last_name,
                    "address": sale.customer.address,
                    "phone_number": sale.customer.phone_number,
                },

                "price": float(sale.price)
            }
            sales_data.append(serialized_sale)

        return JsonResponse(
            {"sales": sales_data},
            encoder=SaleListEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.get(employee_id=content["salesperson"])
            content["salesperson"] = salesperson
        except salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson id"},
                status=400,
            )
        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer id"},
                status=400,
            )
        try:
            vin = content.get("automobile")
            automobile = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Vin"},
                status=400,
            )
        try:
            content["price"] = float(content["price"])
            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SaleListEncoder,
                safe=False,
            )
        except json.JSONDecodeError:
            return JsonResponse(
                {"message": "Invalid Json for sale"},
                status=400,
            )


@require_http_methods(["GET", "DELETE"])
def api_show_sales(request, pk):
    if request.method == "GET":
        sale = Sale.objects.get(id=pk)
        return JsonResponse(
            {"sale": sale},
            encoder=SaleListEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Sale.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "automobile" in content:
                automobile = AutomobileVO.objects.get(id=content["automobile"])
                content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile id"},
                status=400,
            )

        Sale.objects.filter(id=pk).update(**content)
        sale = Sale.objects.get(id=pk)
        return JsonResponse(
            sale,
            encoder=SaleListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_salesperson(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonListEncoder,
        )
    else:
        content = json.loads(request.body)

        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_show_salesperson(request, pk):
    if request.method == "GET":
        salesperson = Salesperson.objects.get(employee_id=pk)
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonListEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Salesperson.objects.filter(employee_id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)

        Salesperson.objects.filter(employee_id=pk).update(**content)
        salesperson = Salesperson.objects.get(id=pk)
        return JsonResponse(
            salesperson,
            encoder=SalespersonListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder,
        )
    else:
        content = json.loads(request.body)

        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_show_customers(request, pk):
    if request.method == "GET":
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerListEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)

        Customer.objects.filter(id=pk).update(**content)
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerListEncoder,
            safe=False,
        )
