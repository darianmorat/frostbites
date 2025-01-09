import { useEffect, useLayoutEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify';
import { Bars, RotatingLines } from 'react-loader-spinner';
import './index.css'

import wave_svg from './assets/images/svg/wave.svg'
import logo_slogan from './assets/images/logo/logoSlogan.svg'

import { Navbar, Footer, Location, Cart } from './components'
import { Home, About, Contact, Shop, Register, Login, Profile, PageNotFound, Admin } from './pages'

// Scroll to the top of the page when the route changes
const Wrapper = ({ children }) => {
   const location = useLocation();

   // Store the current scroll position before the page reload
   useLayoutEffect(() => {
      const scrollPosition = window.scrollY;
      sessionStorage.setItem('scrollPosition', scrollPosition);

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
         const res = await fetch("http://localhost:3000/authentication/verify", {
            method: "GET",
            headers: { 
               token: localStorage.token,
               admin: localStorage.admin 
            }
         });

         const parseRes = await res.json();

         if(parseRes.isAdmin === 'true'){
            setIsAdmin(true)
         } else {
            setIsAdmin(false)
         }

         if(parseRes.success === true) {
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
                  (<Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} isAdmin={isAdmin} setAdmin={setAdmin}/>)
               }

               <Routes>
                  {/* Public routes */}
                  <Route path='/' element={<Home/>}/>
                  <Route path='/about' element={<About/>}/>
                  <Route path='/contact' element={<Contact/>}/>
                  <Route path='/shop' element={<Shop isAdmin={isAdmin}/>}/>
                  <Route path='/not-found' element={<PageNotFound/>}/>


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
                  location.pathname !== '/not-found' && (
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
            autoClose={3000}
            position='bottom-center'
            transition={Bounce}
         />
      </>
   )
}

export default App
