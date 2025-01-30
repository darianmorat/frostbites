import { useEffect, useState } from 'react';
import { useProductStore } from '../../stores/useProductStore';
import { CartSection } from '../../components/CartSection';
import ProductCard from '../../components/ProductCard';
import { AnimatedContainer } from '../../components/AnimatedContainer';
import '../public.css';

// USE REACT MODAL FOR POPUPS
const ShoppingPage = () => {
   const { fetchProducts, products } = useProductStore();

   useEffect(() => {
      fetchProducts();
   }, [fetchProducts]);

   const [activeBtn, setActiveBtn] = useState('explore');

   const toggleActive = (button) => {
      setActiveBtn(button);
   };

   return (
      <div className="shop">
         <AnimatedContainer>
            <div className="shop-container">
               <div className="right-section">
                  <div className="buttons-section">
                     <button
                        className={`explore-btn btn ${activeBtn === 'explore' ? 'active' : 'inactive'}`}
                        onClick={() => toggleActive('explore')}
                     >
                        Explore ice cream catalog
                     </button>
                     <button
                        className={`make-btn btn ${activeBtn === 'make' ? 'active' : 'inactive'}`}
                        onClick={() => toggleActive('make')}
                     >
                        Make your own ice cream
                     </button>
                  </div>

                  {activeBtn === 'explore' && (
                     <div className="product-list">
                        {products.length === 0 && (
                           <div className="no-product-available">
                              <p>It seems like there&apos;s no products available</p>
                           </div>
                        )}

                        {products?.map((product) => (
                           <ProductCard key={product.product_id} product={product} />
                        ))}
                     </div>
                  )}

                  {activeBtn === 'make' && (
                     <div className="product-list-make">
                        <p>In progress</p>
                     </div>
                  )}
               </div>

               <CartSection />
            </div>
         </AnimatedContainer>
      </div>
   );
};

export default ShoppingPage;
