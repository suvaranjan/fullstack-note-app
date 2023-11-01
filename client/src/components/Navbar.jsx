import { useState } from "react";

function Navbar() {
  const [isNightMode, setIsNightMode] = useState(false);

  const toggleDayNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  const accessToken = sessionStorage.getItem("accessToken");
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="/"
            style={{ fontWeight: "600", color: "#8200c3" }}
          >
            Note App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link me-3" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link me-3 ${accessToken ? null : "disabled"}`}
                  href="/profile"
                >
                  Profile
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle me-3 ${`dropdown-item ${
                    accessToken ? null : "disabled"
                  }`}`}
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Note
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/createnote">
                      Create Note
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/allnotes">
                      All Notes
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link me-3" href="/">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-3" aria-disabled="true">
                  <i
                    className={`uil ${isNightMode ? "uil-moon" : "uil-sun"}`}
                    style={{ fontSize: "1.2rem" }}
                    onClick={toggleDayNightMode}
                  ></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
