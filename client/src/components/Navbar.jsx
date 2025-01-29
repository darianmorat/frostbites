import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import 'boxicons';
import { useCartStore } from '../stores/useCartStore';
import { useUserStore } from '../stores/useUserStore';
import logo from '../assets/images/logo/logo.svg';
import './index.css'

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
               <div className="logo" onClick={scrollToTop}>
                  <Link to="/">
                     <img src={logo} alt="Frostbites Logo" className="logo" />
                  </Link>
               </div>
               <li className={url === '' ? 'active' : ''}>
                  <Link to="/" onClick={scrollToTop}>
                     HOMEPAGE
                  </Link>
               </li>
               <li className={url === 'about-us' ? 'active' : ''}>
                  <Link to="/about-us" onClick={scrollToTop}>
                     ABOUT US
                  </Link>
               </li>
               <li className={url === 'shopping' ? 'active' : ''}>
                  <Link to="/shopping" onClick={scrollToTop}>
                     SHOPPING
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
                     DASHBOARD
                  </Link>
               </li>
               <li className={url === 'customers' ? 'active' : ''}>
                  <Link to="/customers" onClick={scrollToTop}>
                     CUSTUMERS
                  </Link>
               </li>
               <li className={url === 'products' ? 'active' : ''}>
                  <Link to="/products" onClick={scrollToTop}>
                     PRODUCTS
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
                  <i className="bx bx-sun bx-sm" id="nav-icon"></i>
                  <i className="bx bx-bell bx-sm" id="nav-icon">
                     <span className="cart-count">3</span>
                  </i>
                  <i
                     className="bx bx-cart-alt bx-sm"
                     id="nav-icon"
                     onClick={() => navigate('/shopping')}
                  >
                     {cart.length === 0 ? (
                        <></>
                     ) : (
                        <span className="cart-count">{cart.length}</span>
                     )}
                  </i>
                  <button className="nav-profile" onClick={toggleDropMenu}>
                     <div className="nav-profile-picture"> </div>
                     <div>
                        <p className="name">{user.user_name}</p>
                        <p className="role">{!isAdmin && <>Customer</>}</p>
                     </div>
                  </button>
               </>
            ) : (
               <>
                  <i className="bx bx-sun bx-sm" id="nav-icon"></i>
                  <i className="bx bx-bell bx-sm" id="nav-icon">
                     <span className="cart-count">3</span>
                  </i>
                  <button className="nav-profile" onClick={toggleDropMenu}>
                     <div className="nav-profile-picture"> </div>
                     <div>
                        <p className="admin-name">{user.user_name}</p>
                        <p className="admin-role">{isAdmin && <>Administrator</>}</p>
                     </div>
                  </button>
               </>
            )}

            {dropMenu && (
               <ul className="dropdown-menu" ref={menuRef}>
                  <li>
                     <Link to="/profile" onClick={() => setDropMenu(false)}>
                        <i className="bx bx-user bx-sm"></i>
                        Profile
                     </Link>
                  </li>
                  <hr />
                  <li>
                     <Link to="/settings" onClick={() => setDropMenu(false)}>
                        <i className="bx bx-cog bx-sm"></i>
                        Settings
                     </Link>
                  </li>
                  <hr />
                  <li>
                     <Link to="#">
                        <i className="bx bx-shield bx-sm"></i>
                        Security
                     </Link>
                  </li>
                  <hr />
                  <li>
                     <Link className="nav-logout-btn" onClick={handleLogout}>
                        <i className="bx bx-log-out-circle bx-sm" id="log-out-icon"></i>
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
            <li>
               <Link to="/login">LOGIN</Link>
            </li>
            <i className="bx bx-sun bx-sm" id="nav-icon"></i>
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
