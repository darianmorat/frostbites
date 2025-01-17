/* eslint-disable react/prop-types */

import { useFormik } from "formik"; // USE REACT HOOK FORM LATER INSTEAD
import * as Yup from "yup";
import { useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { toast } from 'react-toastify'
import api from "../../../api/axios";

export const EditProduct = ({ 
   isAdmin, deleteProductPopup, getProducts,
   productId, productImg, productName, productPrice, 
   cartItems, addProductToCart, removeProductFromCart 
}) => {

   const [editPopup, setEditPopup] = useState(null);

   const formik = useFormik({
      initialValues: {
         imageUrl: productImg,
         name: productName,
         price: productPrice
      },
      validationSchema: Yup.object({
         imageUrl: Yup.string()
            .min(10, 'Url must be at least 10 chars')
            .max(200, 'Url must be less than 200 chars'),
         name: Yup.string()
            .min(4, 'Name must be at least 4 chars')
            .max(50, 'Name must be less than 50 chars'),
         price: Yup.number() 
            .typeError('Price must be a valid number')
            .positive('Price must be greater than zero')
            .max(200, 'Price must be less than 200.00')
      }),

      onSubmit: async (values) => {
         try {
            const config = {
               headers: { 
                  token: localStorage.token 
               }
            }

            const res = await api.put(`/product/update/${productId}`, values, config)
            const data = res.data

            if (data.success) { 
               formik.resetForm({
                  values: {
                     imageUrl: values.imageUrl,
                     name: values.name,
                     price: values.price
                  }
               })

               setEditPopup(false)
               toast.success(data.message)
               getProducts(); // THE POSITION IS NOT CONSISTENT
            } else {
               toast.error(data.message)
            }

         } catch (err) {
            console.error(err);
            toast.error(err.response.data.message)
         }
      }
   })

   const editProductPopup = (productId) => {
      setEditPopup(productId);

      if (!productId) {
         formik.resetForm()
      }
   };

   const productInCart = cartItems.find(item => item.name === productName);

   return (
      <>
         {isAdmin 
            ? (
               <div className='admin-actions'>
                  <button 
                     className='btn admin-edit-btn secondary-btn' 
                     onClick={ () => { editProductPopup(productId) }}
                  >
                     Edit
                  </button>
                  <button 
                     className='btn logout-btn admin-delete-btn' 
                     onClick={() => deleteProductPopup(productId)}
                  >
                     Remove
                  </button>
               </div>
            ) 
            : (
               <div className='product-actions'>
                        <>
                           <button 
                              className={productInCart ?'btn add-btn' :'btn add-btn no-items'} 
                              onClick={() => addProductToCart(productName, productPrice)}
                           >
                              +
                           </button>
                           <p className='quantity'> 
                              {productInCart ?productInCart.quantity :0 }
                           </p>
                           <button 
                              className={productInCart ?'btn remove-btn' :'btn remove-btn no-items'} 
                              onClick={() => removeProductFromCart(productName)}
                           >
                              -
                           </button>
                        </>
               </div>
            )
         }

         { editPopup === productId && (
            <div className="popup" onClick={() => editProductPopup(false)}>
               <RemoveScroll>
                  <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                     <h3>Edit Product</h3>
                     <button 
                        className='btn close-btn' 
                        onClick={()=> editProductPopup(false)}
                     >
                        &#10006;
                     </button>
                     <form className='form' onSubmit={formik.handleSubmit}>
                        <label 
                           htmlFor="imageUrl"
                           className={formik.touched.imageUrl && formik.errors.imageUrl 
                              ? "label-error" 
                              : ""
                           } 
                        >
                           {formik.touched.imageUrl && formik.errors.imageUrl 
                              ? formik.errors.imageUrl 
                              : "Image-url:"
                           }
                        </label>
                        <input 
                           type="text" 
                           className={formik.touched.imageUrl && formik.errors.imageUrl 
                              ? "input input-error" 
                              : "input"
                           }
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur} 
                           value={formik.values.imageUrl}
                           name="imageUrl"
                           id="imageUrl"
                           autoComplete="imageUrl"
                        />
                        <label 
                           htmlFor="name"
                           className={formik.touched.name && formik.errors.name 
                              ? "label-error" 
                              : ""
                           }
                        >
                           {formik.touched.name && formik.errors.name 
                              ? formik.errors.name 
                              : "Name:"
                           }
                        </label>
                        <input 
                           type="text" 
                           className={formik.touched.name && formik.errors.name 
                              ? "input input-error" 
                              : "input"
                           }
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur} 
                           value={formik.values.name}
                           name="name"
                           id="name"
                           autoComplete="name"
                        />
                        <label 
                           htmlFor="price"
                           className={ formik.touched.price && formik.errors.price 
                              ? "label-error" 
                              : ""
                           }
                        >
                           {formik.touched.price && formik.errors.price 
                              ? formik.errors.price 
                              : "Price:"
                           }
                        </label>
                        <input 
                           type="text" 
                           className= {formik.touched.price && formik.errors.price 
                              ? "input input-error" 
                              : "input"
                           }
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur} 
                           value={formik.values.price}
                           name="price"
                           id="price"
                           autoComplete="price"
                        />
                        {/* later add functionality for this one */}
                        <label htmlFor="quantity">Quantity:</label>
                        <input 
                           type="text" 
                           value="" 
                           name="quantity"
                           id="quantity"
                           autoComplete="quantity"
                           disabled
                        />
                        <button 
                           type="submit"
                           className='btn secondary-btn' 
                           disabled= {
                              formik.values.imageUrl === productImg && 
                              formik.values.name === productName && 
                              formik.values.price === productPrice
                           }
                        >
                           Save changes
                        </button>
                     </form>
                  </div>
               </RemoveScroll>
            </div>
         )}
      </>
   )
}
