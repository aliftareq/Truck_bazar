import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useSeller from '../../Hooks/useSeller';
import LoadingSpinner from '../../Pages/Shared/LoadingSpinner/LoadingSpinner';

const SellerRoute = ({ children }) => {
    //context value
    const { user, loading } = useContext(AuthContext)
    const [isSeller, isSellerLoading] = useSeller(user?.email)
    //location
    const location = useLocation()

    if (loading || isSellerLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (user && isSeller) {
        return children
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default SellerRoute;