/* eslint-disable react/prop-types */

import { toast } from 'react-toastify';
import api from '../../../../api/axios';
import { useState } from 'react';

import wave_svg from '../../../assets/images/svg/wave.svg';
import { AnimatedContainer } from '../../../components/animations/AnimatedContainer';

export const SendEmail = ({ setAuth }) => {
   const [loading, setLoading] = useState(false);

   const verifyUser = async () => {
      setLoading(true);

      try {
         const token = window.location.pathname.split('/').pop();

         const res = await api.get(`/verify/send-email/${token}`);
         const data = res.data;

         if (data.token) {
            localStorage.setItem('token', data.token);
            setAuth(true);
            toast.success('Registered Successfully');
         }
      } catch (err) {
         if (err.response) {
            toast.error(err.response.data.message);
         } else {
            toast.error('Server error. Please try again later.');
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="form-body">
         <img src={wave_svg} alt="" className="wave-left-svg" />
         <img src={wave_svg} alt="" className="wave-right-svg" />

         <AnimatedContainer>
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
                     One last step to unlock your account! Click the button below to
                     verify your email.
                  </p>
                  <br />
                  <button
                     type="submit"
                     className="btn secondary-btn btn-submit"
                     onClick={verifyUser}
                     disabled={loading}
                  >
                     {loading ? <>VERIFYING...</> : <>VERIFY EMAIL</>}
                  </button>
               </div>
            </div>
         </AnimatedContainer>
      </div>
   );
};
