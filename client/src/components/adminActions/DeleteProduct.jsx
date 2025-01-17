/* eslint-disable react/prop-types */

import { toast } from 'react-toastify'
import api from '../../../api/axios';

export const DeleteProduct = ({ 
   productId, productName,
   products, setProducts, 
   deletePopup, deleteProductPopup
}) => {

   const deleteProduct = async () => {
      try {
         const config = {
            headers: { 
               token: localStorage.token 
            }
         }

         const res = await api.delete(`/product/delete/${productId}`, config)
         const data = res.data;

         if (data.success) {
            toast.success(data.message)
            setProducts(products.filter(product => product.product_id !== productId));
         } 

      } catch (err) {
         console.error(err);
         toast.error(err.response.data.message)
      }
   }

   return (
      <>
         {deletePopup === productId && (
            <div className="popup" onClick={() => deleteProductPopup(false)}>
               <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                  <p className='confirmation'>
                     Do you wanna remove 
                     <span className='confirmation-product'> {productName}?</span>
                  </p>
                  <button 
                     className='btn close-btn' 
                     onClick={()=> deleteProductPopup(false)}>
                     &#10006;
                  </button>
                  <button 
                     className='btn secondary-btn' 
                     onClick={() => {deleteProduct(productId), deleteProductPopup(false)}}
                  >
                     Yes
                  </button>
                  <button 
                     className='btn logout-btn' 
                     onClick={() => deleteProductPopup(false)}
                  >
                     No
                  </button>
               </div>
            </div>
         )}
      </>
   )
}

