import { useCartStore } from '../stores/useCartStore';
import select_product_img from '../assets/images/svg/selection-product.svg';
import OrderSummary from './OrderSummary';

export const CartSection = () => {
   const { cart } = useCartStore();

   return (
      <div className="left-section">
         <h3>
            Selections for each one of you, your family and of course your friends to
            enjoy separately!
            <span className="max-users"> (MAX 10)</span>
         </h3>

         <img src={select_product_img} alt="" className="select-product-img" />
         <div className="purchase-container">
            <h3 className="purchase-title">ORDER DETAILS</h3>
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
