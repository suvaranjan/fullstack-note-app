import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();

  const accessToken = sessionStorage.getItem("accessToken");
  const [profileData, setprofileData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    pin: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        sessionStorage.setItem("userName", response.data.firstname);
        setprofileData(response.data);
      })
      .catch((error) => {
        console.error("Error accessing protected route:", error);
      });
  }, [accessToken]);

  const handleLogOut = () => {
    if (accessToken) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("userName");
      navigate("/signin");
    }
  };

  return (
    <>
      <Toaster />
      <div
        className="container mt-3 bg-white p-3 m-auto"
        style={{ borderRadius: "10px" }}
      >
        <div className="row">
          <div className="col-md-6">
            <form className="mb-2">
              <div className="form-group">
                <label
                  className="mb-2"
                  htmlFor="firstName"
                  style={{ color: "grey" }}
                >
                  First Name
                </label>
                <span
                  className="form-control-plaintext mb-2"
                  style={{ fontWeight: 600 }}
                >
                  {profileData.firstname}
                </span>
              </div>
              <div className="form-group">
                <label
                  className="mb-2"
                  htmlFor="lastName"
                  style={{ color: "grey" }}
                >
                  Last Name
                </label>
                <span
                  className="form-control-plaintext mb-2"
                  style={{ fontWeight: 600 }}
                >
                  {profileData.lastname}
                </span>
              </div>

              <div className="form-group">
                <label
                  className="mb-2"
                  htmlFor="address"
                  style={{ color: "grey" }}
                >
                  Address
                </label>
                <span
                  className="form-control-plaintext mb-2"
                  style={{ fontWeight: 600 }}
                >
                  {profileData.address}
                </span>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <form className="mb-2">
              <div className="form-group">
                <label
                  className="mb-2"
                  htmlFor="email"
                  style={{ color: "grey" }}
                >
                  Email
                </label>
                <span
                  className="form-control-plaintext mb-2"
                  style={{ fontWeight: 600 }}
                >
                  {profileData.email}
                </span>
              </div>
              <div className="form-group">
                <label
                  className="mb-2"
                  htmlFor="phone"
                  style={{ color: "grey" }}
                >
                  Phone
                </label>
                <span
                  className="form-control-plaintext mb-2"
                  style={{ fontWeight: 600 }}
                >
                  {profileData.phone}
                </span>
              </div>
              <div className="form-group">
                <label className="mb-2" htmlFor="pin" style={{ color: "grey" }}>
                  PIN
                </label>
                <span
                  className="form-control-plaintext mb-2"
                  style={{ fontWeight: 600 }}
                >
                  {profileData.pin}
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12 two-btn-div">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={() => navigate("/profileupdate")}
            >
              Update
            </button>
            <div className="spacediv"></div>
            <button
              type="button"
              className="btn custom-danger-btn"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
