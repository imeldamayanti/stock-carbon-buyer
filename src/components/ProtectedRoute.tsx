import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login-company" replace />;
  }
  return children;
};

export default ProtectedRoute;