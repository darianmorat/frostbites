/* eslint-disable react/prop-types */
import { useCartStore } from '../stores/useCartStore';
import './index.css'; // move the css to this section

const ProductCard = ({ product }) => {
   const { cart, addToCart } = useCartStore();

   const ProductActions = () => {
      const cartItem = cart.find((item) => item.product_id === product.product_id);

      return (
         <div key={product.product_id} className="product-item">
            <div className='product-img-container'>
               <img
                  src={product.product_img}
                  alt={product.product_name}
                  className="product-img"
               />
            </div>
            <p className="product-price">${product.product_price} USD</p>
            <h3 className="product-name">{product.product_name}</h3>

            <div className="product-actions">
               {!cartItem ? (
                  <button
                     className="btn add-to-cart"
                     onClick={() => {
                        addToCart(product);
                     }}
                  >
                     Add to Cart
                  </button>
               ) : (
                  <>
                     <button className="btn secondary-btn-alt" disabled>
                        Item in cart
                     </button>
                  </>
               )}
            </div>
         </div>
      );
   };

   return (
      <>
         <ProductActions key={product.product_id} product={product} />
      </>
   );
};

export default ProductCard;
