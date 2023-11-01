import axios from "axios";
import { toast } from "react-hot-toast";

export const signUpApiCall = async (values) => {
  try {
    await toast.promise(
      axios.post("http://localhost:3000/api/signup", {
        email: values.email,
        password: values.password,
      }),
      {
        loading: "Creating User...",
        success: (response) => {
          return "SignUp successful";
        },
        error: (err) => {
          // console.log(err.response.status);
          return "User already signup !!!";
        },
      }
    );
  } catch (error) {
    if (error.response.status === 500) {
      return toast.error("Internal server error");
    }
  }
};

export const verifyUser = async (email) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/authenticate",
      {
        email,
      }
    );
    if (response.statusText === "OK") {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const signInApiCall = async (email, values) => {
  try {
    const response = await toast.promise(
      axios.post("http://localhost:3000/api/signin", {
        email: email,
        password: values.password,
      }),
      {
        loading: "Sign in...",
        success: (response) => {
          return "Signin successful";
        },
        error: (err) => {
          return "Incorrect Password !!!";
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error();
  }
};

export const resendApiCall = async (email) => {
  try {
    const response = await toast.promise(
      axios.post("http://localhost:3000/api/generateOTP", {
        email: email,
      }),
      {
        loading: "Sending OTP...",
        success: (response) => {
          return "OTP has been sent to your email";
        },
        error: () => {
          return "OTP Generation failed !!!";
        },
      }
    );
    return response.data.OTP;
  } catch (error) {
    console.log(error);
  }
};

export const verifyOTPCall = async (email, otp) => {
  try {
    const response = await toast.promise(
      axios.post("http://localhost:3000/api/verifyOTP", {
        email,
        OTP: otp,
      }),
      {
        loading: "Verifying OTP",
        success: (response) => {
          return "OTP Verified!!";
        },
        error: () => {
          return "OTP Invalid";
        },
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const resetApiCall = async (email, password) => {
  try {
    const response = await toast.promise(
      axios.post("http://localhost:3000/api/resetPassword", {
        email,
        password,
      }),
      {
        loading: "Reseting your password",
        success: (response) => {
          return "Password reset successfull";
        },
        error: () => {
          return "Something went wrong";
        },
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProfileApiCall = async (values, accessToken) => {
  try {
    const response = await toast.promise(
      axios.put(
        "http://localhost:3000/api/profileupdate",
        {
          firstname: values.firstname,
          lastname: values.lastname,
          phone: values.phone,
          email: values.email,
          address: values.address,
          pin: values.pin,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
      {
        loading: "Updating your profile",
        success: (response) => {
          return "Profile Updated!!";
        },
        error: () => {
          return "Something went wrong";
        },
      }
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createNoteApiCall = async (values, accessToken) => {
  try {
    const response = await toast.promise(
      axios.post(
        "http://localhost:3000/api/notes",
        {
          title: values.title,
          content: values.content,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
      {
        loading: "Saving ...",
        success: (response) => {
          return "Note Saved !!!";
        },
        error: () => {
          return "Something went wrong";
        },
      }
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getNotesApiCall = async (accessToken, searchQuery) => {
  try {
    const response = await axios.get("http://localhost:3000/api/notes", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      return response.data.notes;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateNoteApiCall = async (id, accessToken, title, content) => {
  try {
    const response = await toast.promise(
      axios.put(
        `http://localhost:3000/api/notes/${id}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
      {
        loading: "Updating ...",
        success: (response) => {
          return "Note Updated !!!";
        },
        error: () => {
          return "Something went wrong";
        },
      }
    );

    if (response.status === 201) {
      return true;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteNoteApiCall = async (id, accessToken) => {
  try {
    const response = await toast.promise(
      axios.delete(`http://localhost:3000/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      {
        loading: "Deleting ...",
        success: (response) => {
          return "Note Deleted !!!";
        },
        error: () => {
          return "Something went wrong";
        },
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
