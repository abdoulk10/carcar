import { useEffect, useState } from 'react';

function ListAppointments() {
    const [appointments, setAppointments] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments || []);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleCancel = async (id) => {
        const url = `http://localhost:8080/api/appointments/${id}/cancel/`;

        const fetchConfigs = {
            method: "PUT",
            body: JSON.stringify({ status: "canceled" }),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(url, fetchConfigs);

        if (response.ok) {
            getData();
        } else {
            alert("Appointment was not canceled");
        }
    };

    const handleFinish = async (id) => {
        const url = `http://localhost:8080/api/appointments/${id}/finish/`;

        const fetchConfigs = {
            method: "PUT",
            body: JSON.stringify({ status: "finished" }),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, fetchConfigs);

        if (response.ok) {
            getData();
        } else {
            alert("Failed to mark the appointment as finished");
        }
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
            <div className="text-center">
                <h2>Service Appointments</h2>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Customer Name</th>
                        <th>VIP</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        if (appointment.status === "finished" || appointment.status === "canceled") {
                            return null;
                        }
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.customer}</td>
                                <td>{appointment.vip ? "Yes" : "No"}</td>
                                <td>{convertDate(appointment.date_time)}</td>
                                <td>{convertTime(appointment.date_time)}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                                <td><button onClick={() => handleCancel(appointment.id)} className="btn btn-danger">Cancel</button></td>
                                <td><button onClick={() => handleFinish(appointment.id)} className="btn btn-success">Finished</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ListAppointments;
