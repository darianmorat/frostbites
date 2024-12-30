/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import './shop.css'

export function Shop({ isAdmin }){
   const [products, setProducts] = useState([]);

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

   return (
      <div className='shop-site'>
         <h1>Shop page</h1>
         <p>This is a testing text</p>

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
                        <h2>{product.product_name}</h2>
                        <p>${product.product_price}</p>

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
      </div>
   )
}
