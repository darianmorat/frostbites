import { Link } from 'react-router-dom';
import success_payment from '../../assets/images/svg/success_payment.svg';
import wave_svg from '../../assets/images/svg/wave.svg';
import '../private.css';
import api from '../../../api/axios';
import { useEffect } from 'react';
import { useCartStore } from '../../stores/useCartStore';

export const PaymentSuccessPage = () => {
   const { clearCart } = useCartStore();

   const getData = async () => {
      try {
         const config = {
            headers: { token: localStorage.token },
         };

         const sessionId = new URLSearchParams(window.location.search).get('session_id');
         const res = await api.get(`/payment/success?session_id=${sessionId}`, config);

         if (res.data.success) {
            clearCart(true);
         }
      } catch (err) {
         console.log(err);
      }
   };

   useEffect(() => {
      getData();
   }, []);

   return (
      <div className="success">
         <img src={success_payment} alt="" className="success-payment-svg" />

         <img src={wave_svg} alt="" className="wave-left-svg" />
         <img src={wave_svg} alt="" className="wave-right-svg" />
         <img src={wave_svg} alt="" className="wave-left-svg base" />
         <img src={wave_svg} alt="" className="wave-right-svg base" />
         <p>
            Your transaction has been completed successfully. We have <br />
            emailed you details of your order.
         </p>
         <div className="link">
            <Link to="/">GO TO HOMEPAGE</Link>
         </div>
      </div>
   );
};

export default PaymentSuccessPage;
