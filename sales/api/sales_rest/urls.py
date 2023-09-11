from django.urls import path
from sales_rest.views import api_list_sales, api_show_sales, api_list_salesperson, api_show_salesperson, api_list_customers, api_show_customers


urlpatterns = [
    path('sales/', api_list_sales, name='api_list_sales'),
    path('sales/<int:pk>/', api_show_sales, name='api_show_sales'),
    path('salesperson/', api_list_salesperson, name='api_list_salesperson'),
    path('salesperson/<int:pk>/', api_show_salesperson, name='api_show_salesperson'),
    path('customers/', api_list_customers, name='api_list_customers'),
    path('customers/<int:pk>/', api_show_customers, name='api_show_customers')
]
