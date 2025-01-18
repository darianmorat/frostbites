import { Link } from 'react-router-dom';
import logo_slogan from '../../assets/images/logo/logoSlogan.svg';
import './footer.css';

export const Footer = () => {
   const scrollToTop = () => {
      window.scrollTo(0, 0);
   };

   return (
      <div className="footer-page">
         <div className="location-links">
            <div className="location-left">
               <Link to="/" onClick={scrollToTop}>
                  <img className="logo-slogan" src={logo_slogan} alt="Frostbites Logo" />
               </Link>
            </div>

            <div className="location-right">
               <div className="main-links">
                  <h3>Main Links</h3>
                  <Link to="/about" onClick={scrollToTop}>
                     Get to know our team
                  </Link>
                  <br />
                  <Link to="/contact" onClick={scrollToTop}>
                     Send us a message
                  </Link>
                  <br />
               </div>
               <div className="contact-links">
                  <h3>Contact</h3>
                  <Link to="mailto:frostbites@gmail.com">frostbites@gmail.com</Link>
                  <br />
                  <a
                     href="https://web.whatsapp.com/send?phone=3205000000&text=Hello%2C%20I%20am%20interested%20in%20your%20services%21"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     FrostBites WhatsApp
                  </a>
                  <br />
               </div>
               <div className="follow-links">
                  <h3>Follow us</h3>
                  <a href="https://www.instagram.com/darianmorat" target="_blank">
                     Instagram profile
                  </a>
                  <br />
                  <a href="https://www.linkedin.com/in/darianmorat" target="_blank">
                     LinkedIn profile
                  </a>
               </div>
            </div>
         </div>
         <footer className="footer">
            {' '}
            <p>&copy; 2024 | All rights Reserved</p>{' '}
         </footer>
      </div>
   );
};
