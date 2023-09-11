import React, { useEffect, useState } from 'react';

function CreateCustomer() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleChangeFirstName = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleChangeLastName = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleChangeAddress = (event) => {
      const value = event.target.value;
      setAddress(value)
    }

    const handleChangePhoneNumber = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
            data.first_name = firstName;
            data.last_name = lastName;
            data.address = address;
            data.phone_number = phoneNumber;


        const customerURL = 'http://localhost:8090/api/customers/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const customerResponse = await fetch(customerURL, fetchOptions);
        if (customerResponse.ok) {
            const newCustomer = await customerResponse.json();
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className='shadow p-4 mt-4'>
                    <h1>Add a Customer</h1>
                    <form onSubmit={handleSubmit} id="create-shoe-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeFirstName} value={firstName} placeholder="First Name" required name="first_name" type="text" id="first_name" className='form-control' />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeLastName} value={lastName} placeholder="Last Name" required name="last_name" type="text" id="last_name" className='form-control' />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangeAddress} value={address} placeholder="Address" required name="address" type="text" id="address" className='form-control' />
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleChangePhoneNumber} value={phoneNumber} placeholder="Phone Number" required name="phone_number" type="text" id="phone_number" className='form-control' />
                            <label htmlFor="phone_number">Phone Number</label>
                        </div>
                            <button className="btn btn-primary">Create Customer</button>
                        </form>
                    </div>
                </div>
            </div>
    );
}

export default CreateCustomer;
