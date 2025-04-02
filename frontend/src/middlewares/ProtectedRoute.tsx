import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user } = useAuth();

    console.log(user);


    if (!user) {
        return <Navigate to="/signin" />;
    }

    return children;
}