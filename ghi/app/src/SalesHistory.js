import React, { useEffect, useState } from 'react';

function SalesHistory() {
    const [sales, setSales] = useState([]);
    const [salespersons, setSalespersons] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState('');
    const [allSales, setAllSales] = useState([])

    const getData = async () => {
        const salesResponse = await fetch('http://localhost:8090/api/sales/');
        const salespersonResponse = await fetch('http://localhost:8090/api/salesperson/');

        if (salesResponse.ok && salespersonResponse.ok) {
            const salesData = await salesResponse.json();
            const salespersonData = await salespersonResponse.json();
            setSales(salesData.sales || []);
            setAllSales(salesData.sales)
            setSalespersons(salespersonData.salesperson || []);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleSalespersonChange = (event) => {
        console.log(event.target.value, "Event target value")
        const selectedSalespersonEmployeeId = event.target.value;
        setSelectedSalesperson(selectedSalespersonEmployeeId);
        console.log('Selected Salesperson Employee ID:', selectedSalespersonEmployeeId);
        console.log(typeof(selectedSalespersonEmployeeId))
        if (selectedSalespersonEmployeeId === '') {
            getData();
        } else {
            const filtered = allSales.filter(sale => {
              console.log('Sale Employee ID:', sale.salesperson.employee_id);
              console.log(typeof(sale.salesperson.employee_id))
              return sale.salesperson.employee_id === parseInt(selectedSalespersonEmployeeId)
            });
            console.log('Filtered Sales:', filtered);
            setSales(filtered);
        }
    }

    return (
        <div className='container'>
            <h3 className="text-center">Salesperson History</h3>
            <div className="search-bar text-center">
                <select
                    value={selectedSalesperson}
                    onChange={handleSalespersonChange}
                >
                    <option value="">All Salespeople</option>
                    {salespersons.map(salesperson => (
                        <option key={salesperson.employee_id} value={salesperson.employee_id}>
                            {salesperson.first_name} {salesperson.last_name}
                        </option>
                    ))}
                </select>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>Vin</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                            <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>${sale.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesHistory;
