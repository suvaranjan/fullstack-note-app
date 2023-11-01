import { useFormik } from "formik";
import { createNoteApiCall } from "../assets/helper/api";
import { Toaster } from "react-hot-toast";
import { noteValidate } from "../assets/helper/Validate";

function CreateNote() {
  const accessToken = sessionStorage.getItem("accessToken");
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { title: "", content: "" },
    validate: noteValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, actions) => {
      await createNoteApiCall(values, accessToken);
      actions.resetForm();
    },
  });
  return (
    <>
      <Toaster />
      <div
        className="container mt-3 bg-white p-3 m-auto"
        style={{ borderRadius: "10px" }}
      >
        <h1 className="text-center mb-2">Create Your Note</h1>
        <form className="mb-2" onSubmit={handleSubmit}>
          <label htmlFor="exampleFormControlInput1" className="form-label mb-2">
            Title
          </label>
          <input
            type="text"
            className="form-control mb-2"
            name="title"
            value={values.title}
            onChange={handleChange}
          />

          <label
            htmlFor="exampleFormControlTextarea1"
            className="form-label mb-2"
          >
            Note
          </label>
          <textarea
            className="form-control mb-3"
            rows="5"
            name="content"
            value={values.content}
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="btn btn-primary mb-2">
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateNote;
