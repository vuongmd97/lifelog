import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES_CONFIG } from './config/router/router';
import { fetchUserProfile } from './modules/redux/users/userSlice';
import MainLoading from './components/loaders/MainLoading';
import Header from './components/header';
import Sidebar from './components/sidebar';

export default function AuthenticatedApp() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.user.loading);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, []);

    if (loading) return <MainLoading />;

    return (
        <div className="lifelog">
            <Sidebar />
            <div className="container-wrap">
                <Header />
                <Routes>
                    {ROUTES_CONFIG.map((route) => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                    <Route path="*" element={<Navigate to="/calendar" replace />} />
                </Routes>
            </div>
        </div>
    );
}
