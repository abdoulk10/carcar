import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()


from service_rest.models import AutomobileVO


# def get_automobile():
#     response = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles/")
#     content = json.loads(response.content)
#     print(content)
#     for auto in content["autos"]:
#         AutomobileVO.objects.update_or_create(
#             vin=auto["vin"],
#             defaults={
#                 "sold": auto["sold"]},
#         )


def poll():
    while True:
        print('Service poller polling for data')
        try:
            url = "http://inventory-api:8000/api/automobiles/"
            response = requests.get(url)
            content = json.loads(response.content)
            print(content)
            for auto in content["autos"]:
                AutomobileVO.objects.update_or_create(
                        vin=auto["vin"],
                        sold=auto["sold"],
                )
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
