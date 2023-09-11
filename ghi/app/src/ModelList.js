import { useState, useEffect } from 'react';

function ModelList() {
    const [models, setModels] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="text-center">
                <h2>Models</h2>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map((model) => {
                        return (
                            <tr key={model.id}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td>
                                    <img
                                        src={model.picture_url}
                                        alt={model.name}
                                        width="210"
                                        height="150"
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default ModelList;
