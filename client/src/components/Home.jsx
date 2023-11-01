import { Link } from "react-router-dom";

function Home() {
  const userName = sessionStorage.getItem("userName");
  const accessToken = sessionStorage.getItem("accessToken");
  return (
    <div className="container home-div">
      {!userName ? (
        <h1 className="text-center">Welcome to our Note Taking App</h1>
      ) : (
        <h1 className="text-center">
          Hii,{" "}
          <span style={{ fontWeight: "600", color: "#8200c3" }}>
            {userName}
          </span>{" "}
          👋
        </h1>
      )}
      <p className="text-center">
        A MERN stack Note Taking app that allows users to create, view, and
        manage notes with authentication for user privacy and seamless CRUD
        functionality.
      </p>
      <button className="btn btn-primary">
        <Link
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
          to={accessToken ? "/createnote" : "/signup"}
        >
          Try Free
        </Link>
      </button>
    </div>
  );
}

export default Home;
