import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useCartStore } from '../stores/useCartStore';
import { useUserStore } from '../stores/useUserStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from '../assets/images/logo/logo.svg';
import mobile_logo from '../assets/images/logo/mobile_logo.png';
import './index.css';

export const Navbar = () => {
   const { cart } = useCartStore();
   const { isAuth, isAdmin, logout, user } = useUserStore();

   const scrollToTop = () => {
      window.scrollTo(0, 0);
   };

   const [dropMenu, setDropMenu] = useState(false);
   const menuRef = useRef(null);
   const toggleDropMenu = (e) => {
      e.stopPropagation();
      setDropMenu(!dropMenu);
   };

   const [dropMenuBars, setDropMenuBars] = useState(false);
   const toggleDropMenuBars = () => {
      setDropMenuBars(!dropMenuBars);
   };

   const closeOpenMenus = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
         setDropMenu(false);
      }
   };

   document.addEventListener('click', closeOpenMenus);

   // LOGOUT
   const navigate = useNavigate();

   const handleLogout = async (e) => {
      e.preventDefault();
      try {
         logout();
         navigate('/');
      } catch (err) {
         console.error(err);
      }
   };

   const url = window.location.href.split('/').pop();

   const RenderNavLinks = () => (
      <div className="navbar-left">
         {!isAdmin ? (
            <>
               <div className="logo-container" onClick={scrollToTop}>
                  <Link to="/">
                     <img src={logo} alt="Frostbites Logo" className="logo" />
                     <img
                        src={mobile_logo}
                        alt="Frostbites Logo"
                        className="mobile_logo"
                     />
                  </Link>
               </div>
               <li className={url === '' ? 'active' : ''}>
                  <Link to="/" onClick={scrollToTop}>
                     Homepage
                  </Link>
               </li>
               <li className={url === 'about-us' ? 'active' : ''}>
                  <Link to="/about-us" onClick={scrollToTop}>
                     About Us
                  </Link>
               </li>
               <li className={url === 'shopping' ? 'active' : ''}>
                  <Link to="/shopping" onClick={scrollToTop}>
                     Shopping
                  </Link>
               </li>
            </>
         ) : (
            <>
               <div className="logo" onClick={scrollToTop}>
                  <Link to="/dashboard">
                     <img src={logo} alt="Frostbites Logo" className="logo" />
                  </Link>
               </div>
               <li className={url === 'dashboard' ? 'active' : ''}>
                  <Link to="/dashboard" onClick={scrollToTop}>
                     Dashboard
                  </Link>
               </li>
               <li className={url === 'customers' ? 'active' : ''}>
                  <Link to="/customers" onClick={scrollToTop}>
                     Custumers
                  </Link>
               </li>
               <li className={url === 'products' ? 'active' : ''}>
                  <Link to="/products" onClick={scrollToTop}>
                     Products
                  </Link>
               </li>
            </>
         )}
      </div>
   );

   const AuthenticatedNav = () => (
      <>
         <div className="navbar-right">
            {!isAdmin ? (
               <>
                  <div className="icons-container bell">
                     <span className="cart-count">3</span>
                     <FontAwesomeIcon icon="fa-solid fa-bell" className="icons" />
                  </div>
                  <div className="icons-container cart">
                     {cart.length === 0 ? (
                        <></>
                     ) : (
                        <span className="cart-count">{cart.length}</span>
                     )}
                     <FontAwesomeIcon icon="fa-solid fa-cart-flatbed" className="icons" />
                  </div>
                  <div className="icons-container bars" onClick={toggleDropMenuBars}>
                     <FontAwesomeIcon icon="fa-solid fa-bars" className="icons bars" />
                  </div>
                  <button className="nav-profile" onClick={toggleDropMenu}>
                     <div className="nav-profile-picture"> </div>
                     <div>
                        <p className="name">{user.name}</p>
                        <p className="role">{!isAdmin && <>Customer</>}</p>
                     </div>
                  </button>
               </>
            ) : (
               <>
                  <div className="icons-container">
                     <span className="cart-count">3</span>
                     <FontAwesomeIcon icon="fa-solid fa-bell" className="icons" />
                  </div>
                  <div className="icons-container bars">
                     <FontAwesomeIcon icon="fa-solid fa-bars" className="icons bars" />
                  </div>
                  <button className="nav-profile" onClick={toggleDropMenu}>
                     <div className="nav-profile-picture"> </div>
                     <div>
                        <p className="admin-name">{user.name}</p>
                        <p className="admin-role">{isAdmin && <>Administrator</>}</p>
                     </div>
                  </button>
               </>
            )}
            {dropMenuBars && (
               <ul className="dropdown-menu-bars" ref={menuRef}>
                  <li>
                     <Link to="#" onClick={() => setDropMenuBars(false)}>
                        <div className="icons-container">
                           <FontAwesomeIcon
                              icon="fa-solid fa-xmark"
                              className="icons-v2"
                           />
                        </div>
                        Close
                     </Link>
                  </li>
                  <li>
                     <Link to="/" onClick={() => setDropMenuBars(false)}>
                        <div className="icons-container">
                           <FontAwesomeIcon
                              icon="fa-solid fa-user"
                              className="icons-v2"
                           />
                        </div>
                        Homepage
                     </Link>
                  </li>
                  <li>
                     <Link to="/about-us" onClick={() => setDropMenuBars(false)}>
                        <div className="icons-container">
                           <FontAwesomeIcon
                              icon="fa-solid fa-gear"
                              className="icons-v2"
                           />
                        </div>
                        About us
                     </Link>
                  </li>
                  <li>
                     <Link to="/shopping" onClick={() => setDropMenuBars(false)}>
                        <div className="icons-container">
                           <FontAwesomeIcon
                              icon="fa-solid fa-gear"
                              className="icons-v2"
                           />
                        </div>
                        Shopping
                     </Link>
                  </li>
               </ul>
            )}

            {dropMenu && (
               <ul className="dropdown-menu" ref={menuRef}>
                  <li>
                     <Link to="/profile" onClick={() => setDropMenu(false)}>
                        <div className="icons-container">
                           <FontAwesomeIcon
                              icon="fa-solid fa-user"
                              className="icons-v2"
                           />
                        </div>
                        Profile
                     </Link>
                  </li>
                  <hr />
                  <li>
                     <Link to="/settings" onClick={() => setDropMenu(false)}>
                        <div className="icons-container">
                           <FontAwesomeIcon
                              icon="fa-solid fa-gear"
                              className="icons-v2"
                           />
                        </div>
                        Settings
                     </Link>
                  </li>
                  <hr />
                  <li>
                     <Link to="#">
                        <div className="icons-container">
                           <FontAwesomeIcon
                              icon="fa-solid fa-shield-halved"
                              className="icons-v2"
                           />
                        </div>
                        Security
                     </Link>
                  </li>
                  <hr />
                  <li>
                     <Link to="#">
                        <div className="icons-container">
                           <FontAwesomeIcon icon="fa-solid fa-sun" className="icons-v2" />
                        </div>
                        Dark
                     </Link>
                  </li>
                  <hr />
                  <li>
                     <Link className="nav-logout-btn" onClick={handleLogout}>
                        <div className="icons-container">
                           <FontAwesomeIcon
                              icon="fa-solid fa-right-from-bracket"
                              className="icons-v2 logout"
                           />
                        </div>
                        Log Out
                     </Link>
                  </li>
               </ul>
            )}
         </div>
      </>
   );

   const UnauthenticatedNav = () => (
      <>
         <div className="navbar-right">
            <div className="icons-container">
               <FontAwesomeIcon icon="fa-solid fa-cart-flatbed" className="icons" />
            </div>
            <div className="icons-container">
               <FontAwesomeIcon icon="fa-solid fa-sun" className="icons" />
            </div>
            <li>
               <Link to="/login">Join Now</Link>
            </li>
            <div className="icons-container bars">
               <FontAwesomeIcon icon="fa-solid fa-bars" className="icons bars" />
            </div>
         </div>
      </>
   );

   return (
      <nav className={`navbar ${isAdmin ? 'navbar-admin' : ''}`}>
         <div className="navbar-container">
            {RenderNavLinks()}
            {isAuth ? AuthenticatedNav() : UnauthenticatedNav()}
         </div>
      </nav>
   );
};
