import React, { useEffect, useState } from "react";

function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([]);

    const fetchData = async () => {
    const url = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setAutomobiles(data.autos);
    }
    };

    useEffect(() => {
    fetchData();
    }, []);

    return (
    <>
        <div className="text-center">
        <h2>Automobiles</h2>
        </div>
        <table className="table table-striped">
        <thead>
            <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
            </tr>
        </thead>
        <tbody>
            {automobiles.map((automobile) => {
            return (
                <tr key={automobile.id}>
                <td>{automobile.vin}</td>
                <td>{automobile.color}</td>
                <td>{automobile.year}</td>
                <td>{automobile.model.name}</td>
                <td>{automobile.model.manufacturer.name}</td>
                <td>{automobile.sold ? "Yes" : "No"}</td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </>
    );
}

export default AutomobileList;
