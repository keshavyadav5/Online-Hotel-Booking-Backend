import React from 'react';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('currentuser'));

  function logout() {
    localStorage.removeItem('currentuser');
    window.location.href = '/login';
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">Apex</a>
        <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user ? (
              <>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {user.data.name}
                  </button>
                  <ul className="dropdown-menu ">
                    <li><a className="dropdown-item" href="#">Bookings</a></li>
                    <li><a className="dropdown-item" href="#" onClick={logout}>Log Out</a></li>
                  </ul>
                </div>
              </>) : (
              <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/register">Register</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
