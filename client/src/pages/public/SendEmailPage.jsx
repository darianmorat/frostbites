import { useUserStore } from '../../stores/useUserStore';
import { AnimatedContainer } from '../../components/AnimatedContainer';
import wave_svg from '../../assets/images/svg/wave.svg';
import '../public.css';

const SendEmailPage = () => {
   const { loading, verifyUser } = useUserStore();

   const handleVerifyUser = async () => {
      await verifyUser();
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

               <div className="right-form">
                  <p className="form-description">
                     One last step to unlock your account! Click the button below to
                     verify your email.
                  </p>
                  <br />
                  <button
                     type="submit"
                     className="btn secondary-btn btn-submit"
                     onClick={handleVerifyUser}
                     disabled={loading}
                  >
                     {loading ? <>Verifying...</> : <>Verify email</>}
                  </button>
               </div>
            </div>
         </AnimatedContainer>
      </div>
   );
};

export default SendEmailPage;
