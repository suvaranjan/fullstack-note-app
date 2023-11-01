import { useFormik } from "formik";
import { resetValidate } from "../assets/helper/Validate";
import { resetApiCall } from "../assets/helper/api";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Reset() {
  const { email } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { password: "", confirmpassword: "" },
    validate: resetValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { password } = values;
      const success = await resetApiCall(email, password);
      if (success) {
        navigate("/signin");
      }
    },
  });

  return (
    <div className="container mt-5 custom-css">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-center">Reset</h1>
      <form className="mb-3" onSubmit={handleSubmit}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm Password"
          name="confirmpassword"
          value={values.confirmpassword}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button type="submit" className="btn btn-primary mb-3 custom-btn">
          Reset
        </button>
      </form>
    </div>
  );
}

export default Reset;
