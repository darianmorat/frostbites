import { useEffect, useLayoutEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { Bars } from 'react-loader-spinner';
import api from '../api/axios';

import { Login } from './pages/auth/login/Login';
import { Register } from './pages/auth/register/Register';
import { Home } from './pages/public/home/Home';
import { About } from './pages/public/about/About';
import { Shop } from './pages/public/shop/Shop';
import { Profile } from './pages/auth/profile/Profile';
import { Admin } from './pages/admin/Admin';
import { ForgotPassword } from './pages/verify/password/ForgotPassword';
import { ResetPassword } from './pages/verify/password/ResetPassword';
import { SendEmail } from './pages/verify/email/SendEmail';
import { ResendEmail } from './pages/verify/email/ResendEmail';
import { VerifyEmail } from './pages/verify/verifyEmail';
import { Success } from './pages/public/payment/Success';
import { Canceled } from './pages/public/payment/Canceled';
import { PageNotFound } from './pages/public/missing/PageNotFound';

import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { Location } from './components/location/Location';
import { Cart } from './components/cart/Cart';

import { useCartStore } from './stores/useCartStore';

import logo_slogan from './assets/images/logo/logoSlogan.svg';
import './index.css';

const Wrapper = ({ children }) => {
   const location = useLocation();

   useLayoutEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
   }, [location.pathname]);

   return children;
};

function App() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);
   const [loading, setLoading] = useState(true);

   const { fetchCart } = useCartStore();

   const checkAuthentication = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
         setIsAuthenticated(false);
         setIsAdmin(false);
         useCartStore.setState({ cart: [], cartCount: 0, total: 0 });
         return;
      }

      try {
         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         const res = await api.get('/auth/verify', config);
         const data = res.data;

         if (data.isAdmin === true) {
            setIsAdmin(true);
         } else {
            setIsAdmin(false);
         }

         if (data.success === true) {
            setIsAuthenticated(true);
         } else {
            setIsAuthenticated(false);
         }
      } catch (err) {
         toast.error(err.response.data.message);
      }
   };

   useEffect(() => {
      checkAuthentication();
      fetchCart();
   }, [isAuthenticated, isAdmin]);

   useEffect(() => {
      const timer = setTimeout(() => {
         setLoading(false);
      }, 1800);

      return () => clearTimeout(timer);
   }, [loading]);

   const setAuth = (boolean) => {
      setIsAuthenticated(boolean);
   };
   const setAdmin = (boolean) => {
      setIsAdmin(boolean);
   };

   const location = useLocation();

   const hiddentPaths = [
      '/register',
      '/login',
      '/forgot-password',
      '/resend-email',
      '/verify-email',
      '/success',
      '/not-found',
   ];
   const dinamicPrefixes = ['/reset-password', '/send-email'];
   const hideComponents =
      hiddentPaths.includes(location.pathname) ||
      dinamicPrefixes.some((prefix) => location.pathname.startsWith(prefix));

   const hiddenLocation = ['/shop', '/profile', '/admin'];
   const hideLocation = hiddenLocation.includes(location.pathname);

   return (
      <>
         {loading && (
            <div className="loader-container">
               <div className="loader-spinner">
                  <Bars
                     color="#ec4b72"
                     strokeWidth="5"
                     animationDuration="0.75"
                     width="120"
                     visible={true}
                  />
                  <br />
                  <img className="logo-slogan" src={logo_slogan} alt="Frostbites Logo" />
               </div>
            </div>
         )}

         {!loading && (
            <Wrapper>
               {!hideComponents && (
                  <Navbar
                     isAuthenticated={isAuthenticated}
                     setAuth={setAuth}
                     isAdmin={isAdmin}
                     setAdmin={setAdmin}
                  />
               )}

               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/shop" element={<Shop isAdmin={isAdmin} />} />
                  <Route path="/not-found" element={<PageNotFound />} />

                  <Route path="/success" element={<Success />} />
                  <Route path="/canceled" element={<Canceled />} />

                  <Route
                     path="/login"
                     element={
                        !isAuthenticated ? (
                           <Login setAuth={setAuth} />
                        ) : (
                           <Navigate to="/" />
                        )
                     }
                  />
                  <Route
                     path="/register"
                     element={
                        !isAuthenticated ? (
                           <Register setAuth={setAuth} />
                        ) : (
                           <Navigate to="/login" />
                        )
                     }
                  />

                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />

                  <Route
                     path="/send-email/:token"
                     element={
                        !isAuthenticated ? (
                           <SendEmail setAuth={setAuth} />
                        ) : (
                           <Navigate to="/" />
                        )
                     }
                  />

                  <Route path="/resend-email" element={<ResendEmail />} />

                  <Route
                     path="/verify-email"
                     element={!isAuthenticated ? <VerifyEmail /> : <Navigate to="/" />}
                  />

                  <Route
                     path="/admin"
                     element={
                        isAuthenticated && isAdmin ? (
                           <Admin />
                        ) : (
                           <Navigate to="/not-found" />
                        )
                     }
                  />
                  <Route
                     path="/profile"
                     element={
                        isAuthenticated ? (
                           <Profile setAuth={setAuth} />
                        ) : (
                           <Navigate to="/not-found" />
                        )
                     }
                  />

                  <Route path="*" element={<Navigate to="/not-found" />} />
               </Routes>

               {!hideComponents && (
                  <>
                     {!hideLocation && <Location />}
                     <Cart />
                     <Footer />
                  </>
               )}
            </Wrapper>
         )}

         <ToastContainer
            theme="colored"
            autoClose={4000}
            position="bottom-left"
            transition={Bounce}
            pauseOnHover={false}
         />
      </>
   );
}

export default App;
