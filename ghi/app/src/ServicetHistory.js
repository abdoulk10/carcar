import React, { useEffect, useState } from 'react';

function ServicetHistory() {
    const [appointments, setAppointments] = useState([]);
    const [searchVIN, setSearchVIN] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments || []);
            setFilteredAppointments(data.appointments || []);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleSearch = () => {
        if (searchVIN.trim() === '') {
            setFilteredAppointments(appointments);
        } else {
            const filtered = appointments.filter(appointment =>
                appointment.vin.toLowerCase().includes(searchVIN.toLowerCase())
            );
            setFilteredAppointments(filtered);
        }
    }

    const handleClear = () => {
        setSearchVIN('');
        setFilteredAppointments(appointments);
    }

    function convertDate(date) {
        const dateTime = new Date(date);
        const formattedDate = dateTime.toLocaleDateString();
        return formattedDate;
    }

    function convertTime(date) {
        const dateTime = new Date(date);
        const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return formattedTime;
    }

    return (
        <div className='container'>
            <h3 className="text-center">Service History</h3>
            <div className="search-bar text-center">
                <input
                    type="text"
                    placeholder="Enter VIN"
                    value={searchVIN}
                    onChange={(e) => setSearchVIN(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleClear}>Clear</button>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer Name</th>
                        <th>VIP</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.customer}</td>
                            <td>{appointment.vip ? "True" : "False"}</td>
                            <td>{convertDate(appointment.date_time)}</td>
                            <td>{convertTime(appointment.date_time)}</td>
                            <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ServicetHistory;
