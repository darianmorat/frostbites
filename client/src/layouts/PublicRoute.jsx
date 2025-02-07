import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

export const PublicRoute = () => {
   const { isAuth, isAdmin } = useUserStore();

   const location = useLocation();
   const requiresParams = location.pathname === '/verify-email';
   const hasEmailParam = localStorage.getItem('email');

   if (isAuth) return <Navigate to={isAdmin ? '/dashboard' : '/'} />;
   if (requiresParams && !hasEmailParam) return <Navigate to="/not-found" />;

   return <Outlet />;
};
