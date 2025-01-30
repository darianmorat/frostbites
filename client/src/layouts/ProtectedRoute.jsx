import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

export const ProtectedRoute = () => {
   const { isAuth, isAdmin } = useUserStore();

   return isAuth && isAdmin ? <Outlet /> : <Navigate to="/login" />;
};
