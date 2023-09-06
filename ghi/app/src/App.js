import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import AppointmentForm from './AppointmentForm.js';
import ListAppointments from './AppointmentList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/technicians">
            <Route path="new" element={<TechnicianForm />} />
            <Route index element={<TechnicianList />} />
          </Route>

          <Route path="appointments">
            <Route index element={<ListAppointments />} />
            <Route path="new" element={<AppointmentForm />} />
            {/* <Route path="history" element={<AppointmentsHistory />} /> */}
          </Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
