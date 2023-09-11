import React, { useState, useEffect} from "react";

function ModelForm() {
    const [manufacturers, setManufacturers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        picture_url: "",
        manufacturer_id: "",
});

const fetchData = async () => {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setManufacturers(data.manufacturers);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const modelsUrl = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(modelsUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                name: "",
                picture_url: "",
                manufacturer_id: "",
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
                        <h2>Add a Model</h2>
                    </div>
                    <form onSubmit={handleSubmit} id="create-model-form">
                        <div className="form-floating mb-3">
                            <input
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="name"
                                required
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                            />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={formData.picture_url}
                                onChange={handleChange}
                                placeholder="picture_url"
                                required
                                type="text"
                                name="picture_url"
                                id="picture_url"
                                className="form-control"
                            />
                            <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <div className="mb-3">
                        <select
                            value={formData.manufacturer_id}
                            onChange={handleChange}
                            required
                            name="manufacturer_id"
                            id="manufacturer"
                            className="form-select"
                        >
                            <option value="">Select a manufacturer</option>
                            {manufacturers.map((manufacturer) => (
                            <option key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
                            </option>
                            ))}
                        </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModelForm;
