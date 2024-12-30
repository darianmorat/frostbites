/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import './navbar.css';
import logo from '../../assets/images/logo/logo.svg';
import { toast } from "react-toastify";

export const Navbar = ({ isAuthenticated, setAuth, isAdmin, setAdmin }) => {

   const logout = async (e) => {
      e.preventDefault();
      try {
         localStorage.removeItem("token");
         localStorage.removeItem("admin");
         setAuth(false);
         setAdmin(false);
         toast.success("Logout successfully");
      } catch (err) {
         console.error(err);
      }
   };

   const renderNavLinks = () => (
      <>
         <li><Link to="/">HOME</Link></li>
         <li><Link to="/about">ABOUT US</Link></li>
         <li><Link to="/contact">CONTACT</Link></li>
      </>
   );

   const AuthenticatedNav = () => (
      <>
         <div className="navbar-right">
            {/* && is used when we wanna check if true */}
            {isAdmin && <li><Link to="/admin">ADMIN</Link></li>} 

            {/* drop menu for profile, settings and logout */}
            <li><Link to="/profile">USER</Link></li> 
            <button className='' onClick={logout}>Logout</button>
         </div>
      </>
   );

   const UnauthenticatedNav = () => (
      <>
         <div className="navbar-right">
            <li><Link to="/login">LOGIN</Link></li>
            <li><Link to="/register">REGISTER</Link></li>
         </div>
      </>
   );

   return (
      <nav className="navbar">
         <div className="navbar-container">
            <div className="navbar-left">
               <div className="logo">
                  <Link to="/">
                     <img src={logo} alt="Frostbites Logo" className="logo" />
                  </Link>
               </div>
               {renderNavLinks()}
            </div>
            {isAuthenticated ? AuthenticatedNav() : UnauthenticatedNav()}
         </div>
      </nav>
   );
}
