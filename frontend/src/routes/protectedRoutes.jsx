import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const patient=JSON.parse(localStorage.getItem("patient"));
  if (!patient) {
    return <Navigate to="/login" />;
  }
  return children;
}
