import React, { useState, useEffect } from "react";

function AppointmentForm() {
  const [technicians, setTechnicians] = useState([]);
  const [formData, setFormData] = useState({
    vin: "",
    customer: "",
    date_time: "",
    reason: "",
    technician: "",
  });

  const fetchData = async () => {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const appointmentsUrl = "http://localhost:8080/api/appointments/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(appointmentsUrl, fetchConfig);
    if (response.ok) {
      setFormData({
        vin: "",
        customer: "",
        date_time: "",
        reason: "",
        technician: "",
      });
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <div className="text-center">
          <h2>Create a Service Appointment</h2>
          </div>
          <form onSubmit={handleSubmit} id="create-appointment-form">
            <div className="form-floating mb-3">
              <input
                value={formData.vin}
                onChange={handleChange}
                placeholder="vin"
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">Vin</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.customer}
                onChange={handleChange}
                placeholder="customer"
                required
                type="text"
                name="customer"
                id="customer"
                className="form-control"
              />
              <label htmlFor="customer">Customer Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.date_time}
                onChange={handleChange}
                placeholder="date_time"
                required
                type="datetime-local"
                name="date_time"
                id="date_time"
                className="form-control"
              />
              <label htmlFor="date_time">Date and Time</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.reason}
                onChange={handleChange}
                placeholder="reason"
                required
                type="text"
                name="reason"
                id="reason"
                className="form-control"
              />
              <label htmlFor="reason">Reason</label>
            </div>
            <div className="mb-3">
              <select
                value={formData.first_name}
                onChange={handleChange}
                required
                name="technician"
                id="technician"
                className="form-select"
              >
                <option value="">Choose a technician</option>
                {technicians.map((technician) => {
                  return (
                    <option key={technician.id} value={technician.id}>
                      {technician.first_name} {technician.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
