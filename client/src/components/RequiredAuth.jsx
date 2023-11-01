// import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

export function RequiredAuth({ children }) {
  // const accessToken = useSelector((state) => state.user.accessToken);
  const accessToken = sessionStorage.getItem("accessToken");
  const location = useLocation();

  return accessToken ? (
    children
  ) : (
    <Navigate to={"/signin"} replace state={{ path: location.pathname }} />
  );
}
