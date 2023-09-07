import { useState } from 'react';

function ManufacturerForm() {
    const [formData, setFormData] = useState({
        name: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const manUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(manUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                name: '',
            });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <div className="text-center">
                        <h2>Create Manufacturer</h2>
                    </div>
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                            />
                            <label htmlFor="name">Name</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ManufacturerForm;
