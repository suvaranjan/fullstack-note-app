import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { emailValidate } from "../assets/helper/Validate";
import { Toaster, toast } from "react-hot-toast";
import { verifyUser } from "../assets/helper/api";
import { useDispatch } from "react-redux";
import { setEmail } from "../reducers/userReducer";

function EmailSignin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "" },
    validate: emailValidate,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      const { email } = values;
      dispatch(setEmail(email));
      const verify = await verifyUser(email);
      if (!verify) {
        return toast.error("User not found with this email");
      }
      navigate("/password");
    },
  });

  return (
    <div className="container mt-5 custom-css">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h1
        className="text-center"
        style={{
          width: "100%",
          fontSize: "1.5rem",
          marginBottom: "1.5rem",
          fontWeight: "500",
        }}
      >
        Sign In
      </h1>
      <form className="mb-3" onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          id="exampleFormControlInput1"
          placeholder="Enter Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <button type="submit" className="btn btn-primary mb-3 custom-btn">
          {"Let's Go"}
        </button>
        <p className="text-center text-size">
          Not a member ?{" "}
          <span>
            <Link className="link-text text-decoration-none" to="/signup">
              SignUp
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default EmailSignin;
