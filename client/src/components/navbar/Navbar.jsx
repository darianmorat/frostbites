/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRef, useState } from 'react';
import { useCartStore } from '../../stores/useCartStore';
import 'boxicons';

import logo from '../../assets/images/logo/logo.svg';
import './navbar.css';

export const Navbar = ({ isAuthenticated, setAuth, isAdmin, setAdmin }) => {
   const { cartCount } = useCartStore();

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

   // document.querySelectorAll('.navbar-left > li').forEach((li) => {
   //    li.addEventListener('click', function () {
   //       document.querySelectorAll('.navbar-left > li').forEach((item) => {
   //          item.classList.remove('active');
   //       });
   //       this.classList.add('active');
   //    });
   // });

   // LOGOUT
   const navigate = useNavigate();

   const logout = async (e) => {
      e.preventDefault();
      try {
         localStorage.removeItem('token');
         localStorage.removeItem('admin');
         setAuth(false);
         setAdmin(false);
         toast.success('Logout successfully');
         navigate('/'); 
      } catch (err) {
         console.error(err);
      }
   };

   const url = window.location.href.split('/').pop()

   const RenderNavLinks = () => (
      <>
         <li className={url === '' ? 'active' : ''}>
            <Link to="/" onClick={scrollToTop}>
               HOMEPAGE
            </Link>
         </li>
         <li className={url === 'about' ? 'active' : ''}>
            <Link to="/about" onClick={scrollToTop}>
               ABOUT US
            </Link>
         </li>
         <li className={url === 'shop' ? 'active' : ''}>
            <Link to="/shop" onClick={scrollToTop}>
               SHOPPING
            </Link>
         </li>
      </>
   );

   const AuthenticatedNav = () => (
      <>
         <div className="navbar-right">
            {isAdmin ? (
               <>
                  <i
                     className="bx bx-shield bx-sm"
                     id="admin-icon"
                     onClick={() => navigate('/admin')}
                  ></i>
                  <i
                     className="bx bx-user bx-sm"
                     id="user-icon"
                     onClick={toggleDropMenu}
                  ></i>
               </>
            ) : (
               <>
                  <i
                     className="bx bx-user bx-sm"
                     id="user-icon"
                     onClick={toggleDropMenu}
                  ></i>
                  <i
                     className="bx bx-cart-alt bx-sm"
                     id="cart-icon"
                     onClick={() => navigate('/shop')}
                  >
                     {cartCount === 0 ? (
                        <></>
                     ) : (
                        <span className="cart-count">{cartCount}</span>
                     )}
                  </i>
               </>
            )}

            {dropMenu && (
               <ul className="dropdown-menu" ref={menuRef}>
                  <li>
                     <Link to="/profile" onClick={() => setDropMenu(false)}>
                        PROFILE
                     </Link>
                  </li>
                  <hr />
                  <li>
                     <Link to="#">SETTINGS</Link>
                  </li>
                  <hr />
                  <li>
                     <Link to="#">SECURITY</Link>
                  </li>
                  <hr />
                  <li>
                     <Link className="nav-logout-btn" onClick={logout}>
                        LOG OUT
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
            <i
               className="bx bx-cart-alt bx-sm"
               id="cart-icon"
               onClick={() => navigate('/shop')}
            ></i>
         </div>
      </>
   );

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
   );
};
