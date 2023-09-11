import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateSalesperson from './createSalesperson';
import CreateCustomer from './createCustomer';
import SalespersonList from './listSalespeople';
import CustomerList from './listCustomers';
import RecordSale from './RecordSales';
import SalesList from './listSales';
import SalesHistory from './SalesHistory';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import AppointmentForm from './AppointmentForm.js';
import ListAppointments from './AppointmentList';
import ServicetHistory from './ServicetHistory';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import ModelList from './ModelList';
import ModelForm from './ModelForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/salespeople/create" element={<CreateSalesperson />} />
          <Route path="/salespeople" element={<SalespersonList />} />
          <Route path="/customers/create" element={<CreateCustomer />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/sales/create" element={<RecordSale />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/sales/history" element={<SalesHistory />} />

          <Route path="/technicians">
            <Route path="new" element={<TechnicianForm />} />
            <Route index element={<TechnicianList />} />
          </Route>

          <Route path="appointments">
            <Route index element={<ListAppointments />} />
            <Route path="new" element={<AppointmentForm />} />
            <Route path="history" element={<ServicetHistory />} />
          </Route>

          <Route path="manufacturers">
            <Route index element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>

          <Route path="models">
            <Route index element={<ModelList />} />
            <Route path="new" element={<ModelForm />} />
          </Route>

          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
