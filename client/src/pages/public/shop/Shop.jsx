/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import { motion } from "motion/react"
import './shop.css'

export function Shop({ isAdmin }){
   const [products, setProducts] = useState([]);
   const [activeBtn, setActiveBtn] = useState('explore');

   const getProducts = async () => {
      try {
         const res = await fetch('http://localhost:3000/product', {
            method: "GET" 
         });

         const parseData = await res.json();
         setProducts(parseData);

      } catch (err) {
         console.error(err);
      }
   }

   useEffect(() => {
      getProducts(); 
   }, []);

   function toggleActive(button) {
      setActiveBtn(button);
   }

   return (
      <div className='shop-page'>
         <motion.div 
            initial={{ opacity: 0, x: -100 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 100 }} 
            transition={{ duration: 0.7 }}>

            <div className='shop-container'>
               <div className='right-section'>
                  <div className='buttons-section'>
                     <button 
                        className={`explore-btn btn ${activeBtn === 'explore' ? 'active' : 'inactive'}`}
                        onClick={() => toggleActive('explore')}
                     >EXPLORE ICE CREAM CATALOG</button>
                     <button 
                        className={`make-btn btn ${activeBtn === 'make' ? 'active' : 'inactive'}`}
                        onClick={() => toggleActive('make')}
                     >MAKE YOUR OWN ICE CREAM!</button>
                  </div>

                  {activeBtn === 'explore' && 
                     <div className="product-list">
                        {products.length === 0 ? (
                           <p>No products available</p>
                        ) : (
                              products.map((product) => (
                                 <div key={product.product_id} className="product-item">
                                    <img
                                       src={product.product_img}
                                       alt={product.product_name}
                                       className="product-img"
                                    />
                                    <p className='product-price'>${product.product_price}</p>
                                    <h2 className='product-name'>{product.product_name}</h2>

                                    <div className='product-actions'>
                                       <button className='add-btn'>+</button>
                                       <p className='quantity'>2</p>
                                       <button className='remove-btn'>-</button>
                                    </div>

                                    {isAdmin && (
                                       <div className="admin-actions">
                                          <button>Edit</button>
                                          <button>Remove</button>
                                       </div>
                                    )}
                                 </div>
                              ))
                           )}
                     </div>
                  }

                  {activeBtn === 'make' && 
                     <div className='product-list make'>
                        <p>IN PROGRESS</p>
                     </div>
                  }

               </div>
               <div className='left-section'>
                  <h3>left side of the project section for pruchasing something this is just a test for testing</h3>
               </div>
            </div>

         </motion.div>
      </div>
   )
}
