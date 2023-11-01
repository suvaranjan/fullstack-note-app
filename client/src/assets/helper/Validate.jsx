import toast from "react-hot-toast";

export async function signUpValidate(values) {
  const errors = signUpVerify({}, values);
  return errors;
}
export async function emailValidate(values) {
  const errors = emailVerify({}, values);
  return errors;
}
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}
export async function resetValidate(values) {
  const errors = resetVerify({}, values);
  return errors;
}
export async function profileValidate(values) {
  const errors = profileVerify({}, values);
  return errors;
}
export async function noteValidate(values) {
  const errors = noteVerify({}, values);
  return errors;
}

function signUpVerify(error = {}, values) {
  if (!values.email || !values.password) {
    error.email = toast.error("Both Email and Password Required");
  }

  // Check if password contains at least one special character
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (values.password) {
    if (!specialCharacterRegex.test(values.password)) {
      error.password = toast.error("Password must have one special character");
    }
  }

  return error;
}

function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email is Required");
  }
  return error;
}

function passwordVerify(error = {}, values) {
  if (!values.password) {
    error.password = toast.error("Password is Required");
  }
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (values.password) {
    if (!specialCharacterRegex.test(values.password)) {
      error.password = toast.error("Password must have one special character");
    }
  }
  return error;
}

function resetVerify(error = {}, values) {
  if (values.password == "") {
    error.password = toast.error("Fiels are empty !!!");
  }

  if (values.password && values.confirmpassword) {
    if (values.password !== values.confirmpassword)
      error.password = toast.error("Password must match!!");
  }

  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (values.password === values.confirmpassword) {
    if (!specialCharacterRegex.test(values.password)) {
      error.password = toast.error("Password must have one special character");
    }
  }

  return error;
}

function profileVerify(errors = {}, values) {
  // Validate if firstname and lastname are not empty
  if (values.firstname.trim() === "" && values.lastname.trim() === "") {
    errors.firstname = toast.error("Firstname is required!");
    errors.lastname = toast.error("Lastname is required!");
  } else if (values.firstname.trim() === "") {
    errors.firstname = toast.error("Firstname is required!");
  } else if (values.lastname.trim() === "") {
    errors.lastname = toast.error("Lastname is required!");
  }
  if (values.pin.length !== 6) {
    errors.pin = toast.error("PIN code must be 6 digit!");
  } else if (!/^\d{6}$/.test(values.pin)) {
    errors.pin = toast.error("PIN code must be exactly 6 numeric digits!");
  }
  return errors;
}
function noteVerify(errors = {}, values) {
  // Validate if firstname and lastname are not empty
  if (values.title === "" && values.content === "") {
    errors.form = toast.error("Both title and content is required!");
  } else if (values.title === "") {
    errors.title = toast.error("Title is required");
  } else if (values.content === "") {
    errors.content = toast.error("Content is required!");
  }
  return errors;
}

export default profileVerify;
