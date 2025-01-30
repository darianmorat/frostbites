import { useEffect, useLayoutEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import { Bars } from 'react-loader-spinner';

import { useCartStore } from './stores/useCartStore';
import { useUserStore } from './stores/useUserStore';

import { MainRoute } from './layouts/MainRoute';
import { PublicRoute } from './layouts/PublicRoute';
import { PrivateRoute } from './layouts/PrivateRoute';
import { ProtectedRoute } from './layouts/ProtectedRoute';

import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ShoppingPage from './pages/public/ShoppingPage';
import SignUpPage from './pages/public/SignUpPage';
import LoginPage from './pages/public/LoginPage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage';
import ResetPasswordPage from './pages/public/ResetPasswordPage';
import SendEmailPage from './pages/public/SendEmailPage'; // change to verify email
import ResendEmailPage from './pages/public/ResendEmailPage';
import VerifyEmailPage from './pages/public/verifyEmailPage'; // change to send meail
import NotFoundPage from './pages/public/NotFoundPage';

import ProfilePage from './pages/private/ProfilePage';
import SettingsPage from './pages/private/SettingsPage';
import PaymentSuccessPage from './pages/private/PaymentSuccessPage';
// import PaymentCanceledPage from './pages/private/PaymentCanceledPage';

import DashboardPage from './pages/protected/DashboardPage';
import ProductsPage from './pages/protected/ProductsPage';
import CustomersPage from './pages/protected/CustomersPage';

import { Navbar } from './components/Navbar';
import { FooterLinks } from './components/FooterLinks';
import { Footer } from './components/Footer';

import logo_slogan from './assets/images/logo/logoSlogan.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import './index.css';

const Wrapper = ({ children }) => {
   const location = useLocation();

   useLayoutEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
   }, [location.pathname]);

   return children;
};

function App() {
   const { fetchCart } = useCartStore();
   const { isAuth, checkAuth, checkingAuth, getUser, user } = useUserStore();

   useEffect(() => {
      if (!user) {
         getUser();
      }
   }, [getUser, user]);

   useEffect(() => {
      fetchCart();
   }, [fetchCart, isAuth]);

   useEffect(() => {
      const timer = setTimeout(() => {
         checkAuth();
      }, 1500);
      return () => clearTimeout(timer);
   }, [checkAuth]);

   const location = useLocation();
   const hiddentPaths = [
      '/signup',
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

   const hiddenLinks = ['/dashboard', '/products', '/customers', '/profile', '/settings'];
   const hideFooterLinks = hiddenLinks.includes(location.pathname);

   if (checkingAuth) {
      return (
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
      );
   }

   return (
      <>
         <Wrapper>
            {!hideComponents && <Navbar />}

            <Routes>
               <Route element={<MainRoute />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about-us" element={<AboutPage />} />
                  <Route path="/shopping" element={<ShoppingPage />} />
               </Route>

               <Route element={<PublicRoute />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                  <Route path="/verify-email" element={<VerifyEmailPage />} />
                  <Route path="/send-email/:token" element={<SendEmailPage />} />
                  <Route path="/resend-email" element={<ResendEmailPage />} />
               </Route>

               <Route element={<PrivateRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/success" element={<PaymentSuccessPage />} />
                  {/* <Route path="/canceled" element={<PaymentCanceledPage />} /> */}
               </Route>

               <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/customers" element={<CustomersPage />} />
               </Route>

               <Route path="/not-found" element={<NotFoundPage />} />
               <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>

            {!hideComponents && (
               <>
                  {!hideFooterLinks && <FooterLinks />}
                  <Footer />
               </>
            )}
         </Wrapper>

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
library.add(fab, fas, far);
