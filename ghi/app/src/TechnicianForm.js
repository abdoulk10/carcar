import { useState } from "react";

function TechnicianForm() {
    const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    employee_id: '',
    });

    const handleSubmit = async (event) => {
    event.preventDefault();

    const techUrl = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
        'Content-Type': 'application/json',
        },
    };

    const response = await fetch(techUrl, fetchConfig);
    if (response.ok) {
        setFormData({
            first_name: '',
            last_name: '',
            employee_id: '',
        });
    }
    };

    const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
        ...formData,
        [name]: value,
    });
    };

    return (
    <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Create a technician</h1>
            <form onSubmit={handleSubmit} id="create-technician-form">
            <div className="form-floating mb-3">
                <input
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                required
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
                />
                <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
                <input
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                required
                type="text"
                name="last_name"
                id="last_name"
                className="form-control"
                />
                <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
                <input
                value={formData.employee_id}
                onChange={handleChange}
                placeholder="Employee ID" // Updated placeholder
                required
                type="text" // Change to text input since employee_id may not be a number
                name="employee_id" // Update the name here
                id="employee_id" // Update the id here
                className="form-control"
                />
              <label htmlFor="employee_id">Employee ID</label> {/* Updated label */}
            </div>
            <button className="btn btn-primary">Create</button>
            </form>
        </div>
        </div>
    </div>
    );
}

export default TechnicianForm;
