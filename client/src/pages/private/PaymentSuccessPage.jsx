import { Link } from 'react-router-dom';
import success_payment from '../../assets/images/svg/success_payment.svg'
import wave_svg from '../../assets/images/svg/wave.svg';
import '../private.css'

export const PaymentSuccessPage = () => {
   return (
      <div className='success'>
         <img src={success_payment} alt="" className="success-payment-svg" />

         <img src={wave_svg} alt="" className="wave-left-svg" />
         <img src={wave_svg} alt="" className="wave-right-svg" />
         <img src={wave_svg} alt="" className="wave-left-svg base" />
         <img src={wave_svg} alt="" className="wave-right-svg base" />
         <p>
            Your transaction has been completed successfully. We have <br/>
            emailed you details
            of your order.
         </p>
         <div className="link">
            <Link to="/">
            GO TO HOMEPAGE
            </Link>
         </div>
      </div>
   );
}

export default PaymentSuccessPage
