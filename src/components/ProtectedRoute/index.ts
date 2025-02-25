import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import request from '../../api/request';
import { useDispatch } from 'react-redux';
import { setUser, User } from '../../redux/slices/userSlice';

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();
    const dispath = useDispatch();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await request.get('/auth');
                dispath(setUser(data));
            } catch (error) {
                console.log(error);
                navigate('/login');
            }
        };

        checkAuth();
    }, []);

    return children;
}

export default ProtectedRoute;
