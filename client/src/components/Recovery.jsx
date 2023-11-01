import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { resendApiCall, verifyOTPCall } from "../assets/helper/api";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Recovery() {
  const { email } = useSelector((state) => state.user);
  const [otp, setOtp] = useState("");
  const [sentOTP, setSentOTP] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (email) {
      try {
        const OTP = await resendApiCall(email);
        setSentOTP(true);
        setOtp(OTP);
        console.log(`Your OTP is ${OTP} valid only for 10min.`);
      } catch (error) {
        toast.error("Failed to send OTP!");
      }
    } else {
      toast.error("Session Expired!!!");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const verify = await verifyOTPCall(email, otp);
      if (verify) {
        sessionStorage.removeItem("userEmail");
        navigate("/reset");
      }
    } catch (error) {
      toast.error("Failed to verify OTP!");
    }
  };

  const handleResend = async () => {
    if (email) {
      try {
        const newOTP = await resendApiCall(email);
        setOtp(newOTP);
        console.log(`Your OTP is ${newOTP} valid only for 10min.`);
      } catch (error) {
        toast.error("Failed to resend OTP!");
      }
    }
  };

  return (
    <div className="container mt-5 custom-css">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h1 className="text-center">Recovery</h1>
      <form className="mb-3" onSubmit={handleVerifyOTP}>
        {sentOTP ? (
          <input
            type="number"
            className="form-control mb-3"
            id="exampleFormControlInput1"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        ) : (
          <>
            <input
              type="email"
              className="form-control mb-3"
              id="exampleFormControlInput1"
              placeholder={email ? email : "Enter Your Email"}
            />
            <button
              type="button"
              className="btn btn-primary mb-3 custom-btn"
              onClick={handleSendOTP}
            >
              Send OTP
            </button>
          </>
        )}
        {sentOTP && (
          <>
            <button type="submit" className="btn btn-primary mb-3 custom-btn">
              Verify OTP
            </button>
            <p className="text-center text-size">
              Did not get OTP?{" "}
              <span>
                <Link
                  className="link-text text-decoration-none"
                  onClick={handleResend}
                >
                  Resend
                </Link>
              </span>
            </p>
          </>
        )}
      </form>
    </div>
  );
}

export default Recovery;
