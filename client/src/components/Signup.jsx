import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { signUpValidate } from "../assets/helper/Validate";
import { Toaster } from "react-hot-toast";
import { signUpApiCall } from "../assets/helper/api";

function Signup() {
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    validate: signUpValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      signUpApiCall(values);
    },
  });

  return (
    <>
      <div className="container mt-5 custom-css">
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className="text-center">Sign Up</h1>
        <form className="mb-3" onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <button type="submit" className="btn btn-primary mb-3 custom-btn">
            Sign Up
          </button>
          <p className="text-center text-size">
            Already Signed up?{" "}
            <span>
              <Link className="link-text text-decoration-none" to="/signin">
                Sign in
              </Link>
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
