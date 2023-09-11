# CarCar

Team:

* Person 1 - Which microservice?
Abdoul Ba - Automobile Sales
* Person 2 - Which microservice?

## Design
Back-end: Django with Python
Front-end: React.js with CSS
Testing: Docker

## Service microservice

AutomobileVO created to poll data from Inventory Automobile model in order to pull VIN numbers to determine if a customer is a VIP or not.

Appointment model created to list, create and finish or cancel service appointments.

Technician model created in order to create a technician to assign to the service appointments.

## Sales microservice

I created salesperson, customer, and automobileVO models and used them as foreign keys to my sales model. I created api views for all of them, then i created some front-end portions to with the back-end supporting it.
