import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';

import wave_svg from '../../assets/images/svg/wave.svg';

export const VerifyEmail = () => {
   const navigate = useNavigate();
   const location = useLocation();

   const email = location.state?.email || 'your email';

   return (
      <div className="form-body">
         <img src={wave_svg} alt="" className="wave-left-svg" />
         <img src={wave_svg} alt="" className="wave-right-svg" />

         <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4 }}
         >
            <div className="form-container">
               <div className="left-form">
                  <h3 className="form-title">VERIFY YOUR FROST BITES ACCOUNT!</h3>
                  <div className="stick-container">
                     <div className="stick longer-stick"></div>
                     <div className="stick smaller-stick"></div>
                  </div>
               </div>

               <div className="right-form">
                  <p className="form-description">
                     Check <span className="your-email">{email}</span> to verify your
                     account and get started.
                  </p>
                  <br />
                  <button
                     type="submit"
                     className="btn secondary-btn btn-submit"
                     onClick={() =>
                        window.open('https://ethereal.email/messages', '_blank')
                     }
                  >
                     OPEN GMAIL
                  </button>
                  <br />
                  <button
                     type="submit"
                     className="btn secondary-btn btn-submit"
                     onClick={() => navigate('/resend-email')}
                  >
                     RESEND EMAIL
                  </button>
               </div>
            </div>
         </motion.div>
      </div>
   );
};
