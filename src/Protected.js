import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom"
import UserStore from "./store/useUserStore";
import { checkUserAuth } from "./services/userServices";
import Loader from './utils/Loader'

export const ProtectedRoute = () => {
    const location = useLocation();
    const [isChecking, setIsChecking] = useState(true);

    const {isAuthenticated, setUser, clearUser} = UserStore();

    useEffect(() => {
        const verifyAuth = async() => {
            try {
                const result = await checkUserAuth();
                if(result?.isAuthenticated){
                    setUser(result.user);
                }else{
                    clearUser();
                }
            } catch (error) {
                console.error(error);
                clearUser();
            }finally{
                setIsChecking(false);
            }
        }
        verifyAuth();
    }, [setUser, clearUser])   //Effect reruns if these functions change.  // Usually runs once.

    if(isChecking){
        return <Loader />
    }

    if(!isAuthenticated){
        return <Navigate to="/user-login" state={{from:location}} replace />
    }

    // user is auth-render the protected route
    return <Outlet />
}

export const PublicRoute = () => {
    const isAuthenticated = UserStore(state => state.isAuthenticated);
    if(isAuthenticated){
        return <Navigate to="/" replace />
    }
    return <Outlet />
}