import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({ children }) {
  const { isAuthenticated } = useSelector(state => state.admin);

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
}