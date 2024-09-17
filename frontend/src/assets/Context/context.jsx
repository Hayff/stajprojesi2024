import { createContext, useState } from "react";
import {setToken} from "../../libs/http" 

export const AuthContext = createContext();

export function AuthenticationContext({children}){
    const [auth,setAuth] = useState(JSON.parse(localStorage.getItem('auth')));

    const onLoginSuccess = (data) => {
        setToken(data.data);
        setAuth(data);
        localStorage.setItem('auth',JSON.stringify(data));

    }
    const onLogoutSuccess = () => {
        setToken(null);
        setAuth(null);
        localStorage.removeItem('auth');

    }

    return <AuthContext.Provider value={{
        ...auth,
        onLoginSuccess,
        onLogoutSuccess
    }}>
        {children}
    </AuthContext.Provider>
}