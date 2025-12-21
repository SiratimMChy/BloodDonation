import React from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext } from 'react';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading, roleLoading, userStatus} = useContext(AuthContext);

    if(loading || roleLoading){
        return <div className="grid place-items-center min-h-screen"><span className="loading loading-spinner loading-xl"></span></div>
    }
    if(!user || userStatus=='blocked'){
       return <Navigate to="/login"></Navigate>
    }
    return children;
    
};

export default PrivateRoute;