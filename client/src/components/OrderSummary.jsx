import { toast } from 'react-toastify';
import { useState } from 'react';
import api from '../../api/axios';
import { useCartStore } from '../stores/useCartStore';

const OrderSummary = () => {
   const [loading, setLoading] = useState(false);
   const { cart, total, updateQuantity, clearCart } = useCartStore();

   const handlePayment = async () => {
      setLoading(true);
      try {
         const body = {
            cart,
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
      <>
         {cart.map((item, index) => (
            <div className="cart-items" key={index}>
               <div className="quantity-actions">
                  <button
                     className="btn secondary-btn add-quantity-btn"
                     onClick={() => {
                        updateQuantity(item.product_id, item.quantity + 1);
                     }}
                  >
                     +
                  </button>
                  <button
                     className="btn secondary-btn-alt remove-quantity-btn"
                     onClick={() => {
                        updateQuantity(item.product_id, item.quantity - 1);
                     }}
                  >
                     -
                  </button>
               </div>
               <div className="cart-item-descrip">
                  <p>
                     <span className="item-quantity">x{item.quantity}</span> -{' '}
                     {item.product_name}
                  </p>
                  <p>${item.product_price} USD</p>
               </div>
            </div>
         ))}
         <hr />
         <div className="purchase-total">
            <p>Total Amount:</p>
            <p>${total} USD</p>
         </div>
         <button
            className="secondary-btn cart-buy-btn btn"
            onClick={() => handlePayment()}
            disabled={loading}
         >
            {!loading ? <>Buy Now</> : <>Processing...</>}
         </button>
         <button
            className="secondary-btn-alt btn"
            onClick={() => clearCart()}
            disabled={loading}
         >
            {!loading ? <>Clear Cart</> : <>Clear Cart</>}
         </button>
      </>
   );
};

export default OrderSummary;
