import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

export const MainRoute = () => {
   const { isAdmin } = useUserStore();

   return isAdmin ? <Navigate to="/dashboard" /> : <Outlet />;
};
