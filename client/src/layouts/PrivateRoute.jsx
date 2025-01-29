import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

export const PrivateRoute = () => {
   const { isAuth } = useUserStore();

   return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
