/* eslint-disable react/prop-types */

import { useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { toast } from 'react-toastify'
import api from '../../../../api/axios';

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
         const body = {
            image: image, 
            name: name,
            price: price
         }

         const res = await api.post('/product/create', body)
         const data = res.data

         if (data.success) {
            setName('')
            setImage('')
            setPrice('')
            setCreatePopup(false)

            addProduct(data.product);
            toast.success(data.message);

         } else {
            toast.error(data.message);
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
               <RemoveScroll>
                  <div className="popup-content" onClick={(e) => e.stopPropagation()}>
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

                     <button className='btn secondary-btn' onClick={createProduct}>Create</button>
                     <button className='btn close-btn' onClick={()=> createProductPopup(false)}>&#10006;</button>
                  </div>
               </RemoveScroll>
            </div>
         )}
      </>
   )
}
