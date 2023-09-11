import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/salespeople/create">Add a Salesperson</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/salespeople">Salespeople</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/customers/create">Add a Customer</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/customers">Customers</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/sales/create">Add a Sale</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/sales">Sales</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/sales/history">Salesperson History</NavLink>
          </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" aria-current="page" to="/technicians/new">Add a Technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" aria-current="page" to="/technicians">List of Technicians</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/appointments/new">Create a service appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/appointments">Service Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/appointments/history">Service History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/manufacturers">Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/manufacturers/new">Add a Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/models">Models</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/models/new">Add a Model</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/automobiles">Automobiles</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/automobiles/new">Add an Automobile</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
