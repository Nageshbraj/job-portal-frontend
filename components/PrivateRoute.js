import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ permittedRoles, children}){
    const { user} = useAuth() 
    
    if(!user.isLoggedIn && localStorage.getItem('token')) {
        return <p>loading...</p>
    }

    if(!user.isLoggedIn) {
        return <Navigate to="/login" /> 
    }

    if(!user.account || !permittedRoles.includes(user.account.role)) {
        return <Navigate to="/unauthorized" />
    }

    return children
}



