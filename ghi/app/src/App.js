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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
