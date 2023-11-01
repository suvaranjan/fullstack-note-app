import { useLocation } from "react-router-dom";

export default function ShowNote() {
  const location = useLocation();
  const { title, content } = location.state;

  return (
    <div
      className="container note-main-div p-3 mt-3"
      style={{
        borderRadius: "10px",
      }}
    >
      <div>
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </div>
  );
}
