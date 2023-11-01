import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { passwordValidate } from "../assets/helper/Validate";
import { Toaster } from "react-hot-toast";
import { signInApiCall } from "../assets/helper/api";
import { useSelector } from "react-redux";

function Password() {
  const { email } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { password: "" },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const response = await signInApiCall(email, values);
      const { token } = response.data;
      sessionStorage.setItem("accessToken", token);
      navigate("/profileupdate");
    },
  });

  return (
    <div className="container mt-5 custom-css">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h1 className="text-center">Password</h1>
      <form className="mb-3" onSubmit={handleSubmit}>
        <input
          type="Enter password"
          className="form-control mb-3"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button type="submit" className="btn btn-primary mb-3 custom-btn">
          Signin
        </button>
        <p className="text-center text-size">
          Forgot Password ?{" "}
          <span>
            <Link className="link-text text-decoration-none" to="/recovery">
              Recover
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Password;
