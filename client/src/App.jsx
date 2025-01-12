import { useEffect, useLayoutEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify';
import { Bars, RotatingLines } from 'react-loader-spinner';
import api from '../api/axios';

import { Navbar, Footer, Location, Cart } from './components'
import { 
   Home, About, Contact, Shop, 
   Register, Login, Profile, PageNotFound, Admin, 
   ForgotPassword, ResetPassword
} from './pages'

import wave_svg from './assets/images/svg/wave.svg'
import logo_slogan from './assets/images/logo/logoSlogan.svg'
import './index.css'

// Scroll to the top of the page when the route changes
const Wrapper = ({ children }) => {
   const location = useLocation();

   useLayoutEffect(() => {
      // Scroll to the top of the page when the route changes
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
   }, [location.pathname]);

   return children;
};

function App() {

   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [isAdmin, setIsAdmin] = useState(false)
   const [loading, setLoading] = useState(true);

   const checkAuthentication = async () => {
      try {
         const config = {
            headers: { 
               token: localStorage.token,
               admin: localStorage.admin 
            }
         }
         const res = await api.get("/authentication/verify", config);
         const data = res.data;

         if(data.isAdmin === 'true'){
            setIsAdmin(true)
         } else {
            setIsAdmin(false)
         }

         if(data.success === true) {
            setIsAuthenticated(true)
         } else{
            setIsAuthenticated(false)
         } 

      } catch (err) {
         console.error(err)
      } 
   }

   useEffect(() => {
      checkAuthentication()
   }, [isAuthenticated, isAdmin]) // reload the navbar component to show admin button

   useEffect(() => {
      const timer = setTimeout(() => {
         setLoading(false);
      }, 300); // set to 1800

      return () => clearTimeout(timer);
   }, [loading]);

   const setAuth = (boolean) => {
      setIsAuthenticated(boolean)
   }
   const setAdmin = (boolean) => {
      setIsAdmin(boolean)
   }

   const location = useLocation();

{/* && is used when we wanna check if true */}
   return (
      <>
         {loading && (
            <div className='loader-container'>
               <div className='loader-spinner'>
                  <img src={wave_svg} alt="" className="wave-right-svg"/>
                  <img src={wave_svg} alt="" className="wave-left-svg"/>
                  <Bars
                     color="#ec4b72"
                     strokeWidth="5"
                     animationDuration="0.75"
                     width="120"
                     visible={true}
                  />
                  <br/>
                  <img className="logo-slogan" src={logo_slogan} alt="Frostbites Logo" />
               </div>
            </div>
         )}

         {!loading && (
            <Wrapper>
               {/* Hide componets for specific routes */}
               {  location.pathname !== '/login' && 
                  location.pathname !== '/register' && 
                  location.pathname !== '/not-found' && 
                  location.pathname !== '/forgot-password' &&
                  !location.pathname.startsWith('/reset-password/') &&
                  (<Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} isAdmin={isAdmin} setAdmin={setAdmin}/>)
               }

               <Routes>
                  {/* Public routes */}
                  <Route path='/' element={<Home/>}/>
                  <Route path='/about' element={<About/>}/>
                  <Route path='/contact' element={<Contact/>}/>
                  <Route path='/shop' element={<Shop isAdmin={isAdmin}/>}/>
                  <Route path='/not-found' element={<PageNotFound/>}/>

                  <Route path='/forgot-password' element={<ForgotPassword/>}/>
                  <Route path='/reset-password/:token' element={<ResetPassword/>}/>

                  {/* Private routes */}
                  <Route
                     path="/admin"
                     element={isAuthenticated && isAdmin 
                        ? <Admin /> 
                        : <Navigate to='/not-found' />
                     }
                  />
                  <Route
                     path="/profile"
                     element={isAuthenticated 
                        ? <Profile setAuth={setAuth} /> 
                        : <Navigate to='/not-found' />
                     }
                  />

                  {/* Auth routes */}
                  <Route 
                     path="/login" 
                     element={!isAuthenticated 
                        ? <Login setAuth={setAuth}/> 
                        : <Navigate to='/'/>
                     }
                  />
                  <Route 
                     path="/register" 
                     element={!isAuthenticated 
                        ? <Register setAuth={setAuth}/> 
                        : <Navigate to='/login'/>
                     }
                  />

                  {/* Catch all 404 not-found pages */}
                  <Route path='*' element={<Navigate to='/not-found'/>}/> 
               </Routes>

               {/* Hide componets for specific routes */}
               {  location.pathname !== '/login' && 
                  location.pathname !== '/register' && 
                  location.pathname !== '/not-found' &&
                  location.pathname !== '/forgot-password' &&
                  !location.pathname.startsWith('/reset-password/') &&
                  (
                     <>               
                        {location.pathname !== '/shop' && (
                           <>
                              {  location.pathname !== '/profile' &&
                                 location.pathname !== '/admin' && (
                                    <>
                                       <Location/>
                                    </>
                                 )}
                              <Cart/>
                           </>
                        )}
                        <Footer/>
                     </>
                  )}
            </Wrapper>
         )}

         <ToastContainer 
            theme="colored" 
            autoClose={3500}
            position='bottom-center'
            transition={Bounce}
            pauseOnHover={false}
         />
      </>
   )
}

export default App
