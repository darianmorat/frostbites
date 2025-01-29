/* eslint-disable react/prop-types */

import { toast } from 'react-toastify';
import api from '../../../api/axios';
import { useProductStore } from '../../stores/useProductStore';

export const DeleteProduct = ({
   productId,
   productName,
   deletePopup,
   setDeletePopup,
}) => {
   const {fetchProducts}=useProductStore()

   const deleteProduct = async () => {
      try {
         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         const res = await api.delete(`/product/delete/${productId}`, config);
         const data = res.data;

         if (data.success) {
            toast.success(data.message);
            fetchProducts()
         }
      } catch (err) {
         toast.error(err.response.data.message);
      }
   };

   const closePopup = () => {
      setDeletePopup(false);
   };

   return (
      <>
         {deletePopup === productId && (
            <div className="popup" onClick={closePopup}>
               <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                  <p className="confirmation">
                     Do you wanna remove
                     <span className="confirmation-product"> {productName}?</span>
                  </p>
                  <button className="btn close-btn" onClick={closePopup}>
                     &#10006;
                  </button>
                  <button
                     className="btn secondary-btn"
                     onClick={() => {
                        deleteProduct(productId);
                     }}
                  >
                     Yes
                  </button>
                  <button className="btn remove-btn" onClick={closePopup}>
                     No
                  </button>
               </div>
            </div>
         )}
      </>
   );
};
