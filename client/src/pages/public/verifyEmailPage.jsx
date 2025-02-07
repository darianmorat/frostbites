import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../api/axios';
import { AnimatedContainer } from '../../components/AnimatedContainer';
import wave_svg from '../../assets/images/svg/wave.svg';
import '../public.css';

const VerifyEmailPage = () => {
   const [loading, setLoading] = useState(false);
   const [email, setEmail] = useState(localStorage.getItem('email'));
   const [resent, setResent] = useState(false);

   const resendEmail = async (email) => {
      setLoading(true);
      try {
         const res = await api.post('/verify/resend-email', { email });
         const data = res.data;

         if (data.success) {
            setResent(true);
            toast.info(data.message);
            localStorage.removeItem('email');
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
         <img src={wave_svg} alt="" className="wave-left-svg base" />
         <img src={wave_svg} alt="" className="wave-right-svg base" />

         <AnimatedContainer>
            <div className="form-container">
               <div className="left-form">
                  <h3 className="form-title">Verify your frost bites account!</h3>
                  <div className="stick-container">
                     <div className="stick longer-stick"></div>
                     <div className="stick smaller-stick"></div>
                  </div>
               </div>

               <div className="right-form spacing">
                  <p className="form-description">
                     {resent ? (
                        <>
                           Email resent at
                           <span className="your-email"> {email}</span>, please make sure
                           to check your inbox!
                        </>
                     ) : (
                        <>
                           We are almost there! Please make sure to check your email:
                           <span className="your-email"> {email}</span> to verify your
                           account and get started.
                        </>
                     )}
                  </p>
                  <button
                     type="submit"
                     className="btn secondary-btn btn-submit"
                     onClick={() => window.open('https://mail.google.com', '_blank')}
                  >
                     Open gmail
                  </button>
                  <button
                     type="submit"
                     className="btn secondary-btn-alt btn-submit"
                     onClick={() => resendEmail(email)}
                     disabled={loading || resent}
                  >
                     {loading ? <>Sending...</> : <>Resend email</>}
                  </button>
               </div>
            </div>
         </AnimatedContainer>
      </div>
   );
};

export default VerifyEmailPage;
