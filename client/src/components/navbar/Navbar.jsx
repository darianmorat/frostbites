/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import './navbar.css';
import logo from '../../assets/images/logo/logo.svg';
import { toast } from "react-toastify";
import { useRef, useState } from "react";

export const Navbar = ({ isAuthenticated, setAuth, isAdmin, setAdmin }) => {

   const scrollToTop = () => {
      window.scrollTo(0, 0);
   };

   const [dropMenu, setDropMenu] = useState(false)
   const menuRef = useRef(null)

   const toggleDropMenu = (e) => {
      e.stopPropagation()
      setDropMenu(!dropMenu)
   }

   const closeOpenMenus = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
         setDropMenu(false)
      }
   }

   document.addEventListener('click', closeOpenMenus)

   // LOGOUT
   const navigate = useNavigate();

   const logout = async (e) => {
      e.preventDefault();
      try {
         localStorage.removeItem("token");
         localStorage.removeItem("admin");
         setAuth(false);
         setAdmin(false);
         toast.success("Logout successfully");
         navigate('/') // REDIRECT TO THIS ROUTE AFTER LOGOUT
      } catch (err) {
         console.error(err);
      }
   }

   const RenderNavLinks = () => (
      <>
         <li><Link to="/" onClick={scrollToTop}>HOME</Link></li>
         <li><Link to="/about" onClick={scrollToTop}>ABOUT US</Link></li>
         <li><Link to="/contact" onClick={scrollToTop}>CONTACT</Link></li>
      </>
   )

   const AuthenticatedNav = () => (
      <>
         <div className="navbar-right">
            {isAdmin && <li><Link to="/admin">ADMIN</Link></li>} 

            <div>
               <button className='dropmenu-btn btn' onClick={toggleDropMenu}>MENU</button>
               {dropMenu && (
                  <ul className="dropdown-menu" ref={menuRef}>
                     <li><Link to="/profile" onClick={() => setDropMenu(false)}>PROFILE</Link></li>
                     <li><Link className='nav-logout-btn' onClick={logout}>LOGOUT</Link></li>
                  </ul>
               )}
            </div>
         </div>
      </>
   )

   const UnauthenticatedNav = () => (
      <>
         <div className="navbar-right">
            <li><Link to="/login">LOGIN</Link></li>
            <li><Link to="/register">REGISTER</Link></li>
         </div>
      </>
   )

   return (
      <nav className="navbar">
         <div className="navbar-container">
            <div className="navbar-left">
               <div className="logo" onClick={scrollToTop}>
                  <Link to="/">
                     <img src={logo} alt="Frostbites Logo" className="logo" />
                  </Link>
               </div>
               {RenderNavLinks()}
            </div>
            {isAuthenticated ? AuthenticatedNav() : UnauthenticatedNav()}
         </div>
      </nav>
   )
}
