import { useEffect, useLayoutEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import './index.css'

import { Navbar, Footer, Location, Cart } from './components'
import { 
   Home, About, Contact, Shop, 
   Register, Login, Profile, PageNotFound, Admin
} from './pages'

// Scroll to the top of the page when the route changes
const Wrapper = ({ children }) => {
   const location = useLocation();

   useLayoutEffect(() => {
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
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      checkAuthentication()
   }, [isAuthenticated, isAdmin]) // reload the navbar component to show admin button

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
                  <RotatingLines
                     strokeColor="white"
                     strokeWidth="5"
                     animationDuration="0.75"
                     width="170"
                     visible={true}
                  />
                  <p className='loader-description'>Loading...</p>
               </div>
            </div>
         )}

         <Wrapper>

            {/* Hide componets for specific routes */}
            {
               location.pathname !== '/login' && 
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
               {/* Only render protected routes after authentication check is complete */}
               {!loading && (
                  <>
                     <Route
                        path="/admin"
                        element={isAuthenticated && isAdmin 
                           ? <Admin /> 
                           : <Navigate to='/login' />
                        }
                     />
                     <Route
                        path="/profile"
                        element={isAuthenticated 
                           ? <Profile setAuth={setAuth} /> 
                           : <Navigate to='/login' />
                        }
                     />
                  </>
               )}

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
            {
               location.pathname !== '/login' && 
               location.pathname !== '/register' && 
               location.pathname !== '/not-found' && (
                  <>               
                     {location.pathname !== '/shop' && (
                        <>
                           <Location/>
                           <Cart/>
                        </>
                     )}
                     <Footer/>
                  </>
               )}

         </Wrapper>

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
