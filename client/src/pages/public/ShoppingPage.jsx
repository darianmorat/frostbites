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
                           <ProductCard key={product.id} product={product} />
                        ))}

                        {/* <div className="product-item"> */}
                        {/*    <div className="product-img-container"> */}
                        {/*       <img */}
                        {/*          src="https://i.ibb.co/3W7ztyW/banana.png" */}
                        {/*          alt="sold-out" */}
                        {/*          className="product-img" */}
                        {/*       /> */}
                        {/*    </div> */}
                        {/*    <p className="product-price">$3.20 USD</p> */}
                        {/*    <h3 className="product-name">ChocoMax</h3> */}
                        {/**/}
                        {/*    <div className="product-actions"> */}
                        {/*       <> */}
                        {/*          <button className="btn secondary-btn-alt" disabled> */}
                        {/*             Item Sold out */}
                        {/*          </button> */}
                        {/*       </> */}
                        {/*    </div> */}
                        {/* </div> */}
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
