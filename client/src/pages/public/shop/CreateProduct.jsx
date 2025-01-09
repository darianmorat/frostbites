/* eslint-disable react/prop-types */

import { useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { toast } from 'react-toastify'

export const CreateProductC = ({ isAdmin, addProduct }) => {
   // ==============
   // CREATE PRODUCT 
   // ==============
   const [name, setName] = useState('')
   const [image, setImage] = useState('')
   const [price, setPrice] = useState('')

   const [createPopup, setCreatePopup] = useState(false);

   const createProduct = async () => {
      try {
         const res = await fetch('http://localhost:3000/product/create', {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               image: image, 
               name: name,
               price: price
            })
         })

         const parseData = await res.json();

         if (parseData.success) {
            setName('')
            setImage('')
            setPrice('')
            setCreatePopup(false)

            addProduct(parseData.product);
            toast.success(parseData.message);

         } else {
            toast.error(parseData.message);
         }

      } catch (err) {
         console.error(err);
      }
   }

   const createProductPopup = (bool) => {
      setCreatePopup(bool);
   };

   return (
      <>
         { isAdmin && (
            <div className='admin-actions'>
               <button 
                  className='btn primary-btn primary-btn-alt admin-create-product-btn' 
                  onClick={() => createProductPopup(true)}
               >
                  Create Product
               </button>
            </div>
         )}
         { createPopup && (
            <div className="popup" onClick={() => createProductPopup(false)}>
               <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                  <RemoveScroll>
                     <h3>Create Product</h3>
                     <input 
                        type="text" 
                        placeholder="Product Image URL" 
                        value={image}
                        onChange={(e) => setImage(e.target.value)} 
                     />
                     <input 
                        type="text" 
                        placeholder="Product Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                     />
                     <input 
                        type="number" 
                        placeholder="Product Price" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} 
                     />

                     <button onClick={createProduct}>Create product</button>
                     <button onClick={()=> createProductPopup(false)}>Close</button>
                  </RemoveScroll>
               </div>
            </div>
         )}
      </>
   )
}
