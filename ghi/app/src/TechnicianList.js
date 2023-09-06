// import React, { useEffect, useState } from 'react';

// function TechnicianList() {

//     const [technicians, setTechnicians] = useState([])

//     const fetchData = async () => {
//         const url = 'http://localhost:8080/api/technicians/';
//         const response = await fetch(url);
//         if (response.ok) {
//             const data = await response.json();
//             setTechnicians(data.technicians);
//         }
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <>
//             <h1>List of Techs</h1>
//             <table className="table table-striped">
//                 <thead>
//                     <tr>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                         <th>Employee number</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {technicians.map(technician => {
//                         return (
//                             <tr key={technician.id}>
//                                 <td>{technician.first_name}</td>
//                                 <td>{technician.last_name}</td>
//                                 <td>{technician.employee_id}</td>
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </table>
//         </>
//     );
// }




// export default TechnicianList;

import React, { useEffect, useState } from 'react';

function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    };

    const handleDelete = async (technicianId) => {
        const url = `http://localhost:8080/api/technicians/${technicianId}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (response.ok) {
            // Remove the deleted technician from the list
            setTechnicians((prevTechnicians) =>
                prevTechnicians.filter((technician) => technician.id !== technicianId)
            );
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h1>List of Techs</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Employee number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.map((technician) => {
                        return (
                            <tr key={technician.id}>
                                <td>{technician.first_name}</td>
                                <td>{technician.last_name}</td>
                                <td>{technician.employee_id}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(technician.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default TechnicianList;
