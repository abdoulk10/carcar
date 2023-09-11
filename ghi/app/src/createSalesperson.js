import React, { useEffect, useState } from 'react';

function CreateSalesperson() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeid, setEmployeeID] = useState('');

    const handleChangeFirstName = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleChangeLastName = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleChangeEmployeeID = (event) => {
        const value = event.target.value;
        setEmployeeID(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
            data.first_name = firstName;
            data.last_name = lastName;
            data.employee_id = employeeid;


        const salespersonURL = 'http://localhost:8090/api/salesperson/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const salespersonResponse = await fetch(salespersonURL, fetchOptions);
        if (salespersonResponse.ok) {
            const newSalesperson = await salespersonResponse.json();
            setFirstName('');
            setLastName('');
            setEmployeeID('');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className='shadow p-4 mt-4'>
                    <h1>Add a Salesperson</h1>
                    <form onSubmit={handleSubmit} id="create-salesperson-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeFirstName} value={firstName} placeholder="First Name" required name="first_name" type="text" id="first_name" className='form-control' />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeLastName} value={lastName} placeholder="Last Name" required name="last_name" type="text" id="last_name" className='form-control' />
                            <label htmlFor="last_name"> Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeEmployeeID} value={employeeid} placeholder="Employee ID" required name="employee_id" type="text" id="employee_id" className='form-control' />
                            <label htmlFor="employee_id">Employee ID</label>
                        </div>
                            <button className="btn btn-primary">Create Salesperson</button>
                        </form>
                    </div>
                </div>
            </div>
    );
}

export default CreateSalesperson;
