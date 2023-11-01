import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import { profileValidate } from "../assets/helper/Validate";
import { updateProfileApiCall } from "../assets/helper/api";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    pin: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData(); // Call the async function
  }, [accessToken]);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstname: userData.firstname || "",
      lastname: userData.lastname || "",
      phone: userData.phone || "",
      email: userData.email || "",
      address: userData.address || "",
      pin: userData.pin || "",
    },
    enableReinitialize: true,
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      await updateProfileApiCall(values, accessToken);
      navigate("/profile");
    },
  });

  return (
    <>
      <Toaster />

      <div
        className="container mt-3 bg-white p-3 m-auto"
        style={{ borderRadius: "10px" }}
      >
        <form className="mb-2" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="firstname"
                  value={values.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control mb-2"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="mb-2" htmlFor="phone">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control mb-2"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="mb-2" htmlFor="pin">
                  PIN
                </label>
                <input
                  type="text"
                  className="form-control mb-3"
                  name="pin"
                  value={values.pin}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <button type="submit" className="btn btn-primary btn-block">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileUpdate;
