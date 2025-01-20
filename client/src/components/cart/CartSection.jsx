/* eslint-disable react/prop-types */

import { toast } from 'react-toastify';
import api from '../../../api/axios';
import select_product_img from '../../assets/images/svg/selection-product.svg';
import { useState } from 'react';

export const CartSection = ({ cartItems, totalPrice }) => {
   const [loading, setLoading] = useState(false);

   const handlePayment = async () => {
      setLoading(true);
      try {
         const body = {
            cartItems,
         };

         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         const res = await api.post('/payment/check-session', body, config);
         const data = res.data;

         if (data.success && data.url) {
            window.location.href = data.url;
         }
      } catch (err) {
         toast.error(err.response.data.message);
      }
   };

   return (
      <div className="left-section">
         <h3>
            SELECTIONS FOR EACH ONE OF YOU, YOUR FAMILY AND OF COURSE YOUR FRIENDS TO
            ENJOY SEPARATELY!
            <span className="max-users"> (MAX 10)</span>
         </h3>

         <img src={select_product_img} alt="" className="select-product-img" />
         <div className="purchase-container">
            <h3 className="purchase-title">PURCHASE DETAILS</h3>
            <div className="cart-list">
               {cartItems.length === 0 ? (
                  <>
                     <p>It looks like there&apos;s nothing here, get some!</p>
                     <button className="secondary-btn cart-buy-btn btn" disabled>
                        BUY NOW
                     </button>
                  </>
               ) : (
                  <>
                     {cartItems.map((item, index) => (
                        <div className="cart-items" key={index}>
                           <p>
                              x{item.quantity} {item.product_name}
                           </p>
                           <p>${item.product_price} USD</p>
                        </div>
                     ))}
                     <hr />
                     <div className="purchase-total">
                        <p>TOTAL AMOUNT:</p>
                        <p>${totalPrice} USD</p>
                     </div>
                     <button
                        className="secondary-btn cart-buy-btn btn"
                        onClick={() => handlePayment()}
                        disabled={loading}
                     >
                        {!loading ? <>BUY NOW</> : <>PROCESSING...</>}
                     </button>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};
