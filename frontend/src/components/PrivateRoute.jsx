import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
    const { authenticated } = useAuth();

    if (!authenticated) {
        return <Navigate to="/" />;
    }

    return children;
}

export default PrivateRoute;
