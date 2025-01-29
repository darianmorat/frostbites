import { useCartStore } from '../stores/useCartStore';
import select_product_img from '../assets/images/svg/selection-product.svg';
import OrderSummary from './OrderSummary';

export const CartSection = () => {
   const { cart } = useCartStore();

   return (
      <div className="left-section">
         <img src={select_product_img} alt="" className="select-product-img" />
         <div className="purchase-container">
            <h3 className="purchase-title">Order Summary</h3>
            <div className="cart-list">
               {cart.length === 0 && (
                  <>
                     <p>It looks like there&apos;s nothing here, get some!</p>
                     <button className="secondary-btn cart-buy-btn btn" disabled>
                        Buy Now
                     </button>
                  </>
               )}

               {cart.length > 0 && <OrderSummary />}
            </div>
         </div>
      </div>
   );
};
