/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import { motion } from "motion/react"
import { toast } from 'react-toastify'
import { RemoveScroll } from 'react-remove-scroll';
import { CreateProductC } from './CreateProduct'
import api from '../../../../api/axios';

import select_product_img from '../../../assets/images/svg/selection-product.svg'
import './shop.css'

export const Shop = ({ isAdmin }) => {
   // ============
   // GET PRODUCTS
   // ============
   const [products, setProducts] = useState([]);

   const getProducts = async () => {
      try {
         const res = await api.get('/product');
         const data = res.data;

         setProducts(data.products);

      } catch (err) {
         console.error(err);
      }
   }

   useEffect(() => {
      getProducts(); 
   }, []);

   const addProductToList = (newProduct) => {
      setProducts(prevProducts => [...prevProducts, newProduct]);
   };

   // ==============
   // UPDATE PRODUCT 
   // ==============

   // USE FORMIK HERE, BUT U NEED TO MOVE THIS SECTION TO A SINGLE FILE
   const [newName, setNewName] = useState('')
   const [newImage, setNewImage] = useState('')
   const [newPrice, setNewPrice] = useState('')

   const [editPopup, setEditPopup] = useState(null);
   const [currentProduct, setCurrentProduct] = useState({});

   const updateProduct = async (productId) => {
      try {
         const body = {
            image: newImage, 
            name: newName,
            price: newPrice
         }

         const res = await api.put(`/product/update/${productId}`, body)
         const data = res.data

         if (data.success) { 
            setEditPopup(false)
            getProducts(); // THE POSITION IS CHANGED TO THE LAST ONE

            toast.success(data.message)
         } 
         else {
            toast.error(data.message)
         }

      } catch (err) {
         console.error(err);
      }
   }

   const editProductPopup = (productId) => {
      setEditPopup(productId);
   };

   // ==============
   // DELETE PRODUCT 
   // ==============
   const [deletePopup, setDeletePopup] = useState(null)

   const deleteProduct = async (productId) => {
      try {
         const res = await api.delete(`/product/delete/${productId}`)
         const data = res.data;

         if (data.success) {
            toast.success(data.message)
            setProducts(products.filter(product => product.product_id !== productId));
         } else {
            toast.error(data.message)
         }

      } catch (err) {
         console.error(err);
      }
   }

   const deleteProductPopup = (productId) => {
      setDeletePopup(productId)
   };

   // ===================
   // ADD PRODUCT TO CART 
   // ===================
   const [cartItems, setCartItems] = useState([]);

   const addProductToCart = (productName, productPrice) => {
      setCartItems(prevCartItems => {
         const existingProduct = prevCartItems.find(item => item.name === productName)

         if(existingProduct){
            return prevCartItems.map(item =>
               item.name === productName 
                  ? { ...item, price:productPrice, quantity: item.quantity + 1 } 
                  : item
            )
         } else {
            return [...prevCartItems, { name: productName, price: productPrice, quantity: 1 }]
         }
      })
   }

   const removeProductFromCart = (productName) => {
      setCartItems(prevCartItems => {
         const existingProduct = prevCartItems.find(item => item.name === productName)

         if(existingProduct){
            return prevCartItems
               .map(item =>
                  item.name === productName 
                     ? (item.quantity > 1 ? { ...item,  quantity: item.quantity - 1 } : null) 
                     : item
               )
               .filter(item => item !== null)
         } else {
            return [...prevCartItems]
         }
      })
   }

   const totalPrice = cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity)
   }, 0).toFixed(2)

   // ==================
   // RETURN APPLICATION 
   // ==================
   const [activeBtn, setActiveBtn] = useState('explore');

   const toggleActive = (button) => {
      setActiveBtn(button);
   }

   const Currency = () => (
      <>
         USD
      </>
   )

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
                     > 
                        EXPLORE ICE CREAM CATALOG 
                     </button>
                     <button 
                        className={`make-btn btn ${activeBtn === 'make' ? 'active' : 'inactive'}`}
                        onClick={() => toggleActive('make')}
                     > 
                        MAKE YOUR OWN ICE CREAM!
                     </button>
                  </div>

                  {activeBtn === 'explore' && 
                     <div className="product-list">
                        { products.length === 0 
                           ? ( 
                              <div className='no-product-available'>
                                 <p>It seems like there&apos;s no products available</p>
                                 <CreateProductC addProduct={addProductToList} isAdmin={isAdmin}/>
                              </div>
                           ) 
                           : ( 
                              <>
                                 { products.map((product) => (
                                    <div key={product.product_id} className="product-item">
                                       <img
                                          src={product.product_img}
                                          alt={product.product_name}
                                          className="product-img"
                                       />
                                       <p className='product-price'>${product.product_price} <Currency/></p>
                                       <h2 className='product-name'>{product.product_name}</h2>

                                       {isAdmin 
                                          ? (
                                             <div className='admin-actions'>
                                                <button className='btn admin-edit-btn secondary-btn' 
                                                   onClick={ () => {
                                                      editProductPopup(product.product_id)
                                                      setCurrentProduct(product.product_id)

                                                      setNewImage(product.product_img)
                                                      setNewName(product.product_name)
                                                      setNewPrice(product.product_price)
                                                   }}
                                                >
                                                   Edit
                                                </button>
                                                {/* ADD CONFIMATION TO REMOVE THE PRODUCT */}
                                                <button className='btn logout-btn admin-delete-btn' 
                                                   onClick={() => deleteProductPopup(product.product_id)}
                                                >
                                                   Remove
                                                </button>
                                             </div>
                                          ) 
                                          : (
                                             <div className='product-actions'>
                                                {cartItems.find(item => item.name === product.product_name) 
                                                   ? (
                                                      <>
                                                         <button className='btn add-btn' onClick={() => addProductToCart(product.product_name, product.product_price)}>+</button>
                                                         <p className='quantity'> {cartItems.find(item => item.name === product.product_name).quantity} </p>
                                                         <button className='btn remove-btn' onClick={() => removeProductFromCart(product.product_name)}>-</button>
                                                      </>
                                                   ) 
                                                   : (
                                                      <>
                                                         <button className='btn add-btn no-items' onClick={() => addProductToCart(product.product_name, product.product_price)}>+</button>
                                                         <p className='quantity'>0</p>
                                                         <button className='btn remove-btn no-items' onClick={() => removeProductFromCart(product.product_name)}>-</button>
                                                      </>
                                                   )}

                                             </div>
                                          )
                                       }

                                       { editPopup === product.product_id && (
                                          <div className="popup" onClick={() => editProductPopup(false)}>
                                             <RemoveScroll>
                                                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                                                   <h3>Edit Product</h3>
                                                   <button className='btn close-btn' onClick={()=> editProductPopup(false)}>&#10006;</button>
                                                   <form className='form'>
                                                      <label htmlFor="text">Image-url:</label>
                                                      <input 
                                                         type="text" 
                                                         value={newImage}
                                                         onChange={(e) => setNewImage(e.target.value)} 
                                                      />
                                                      <label htmlFor="text">Name:</label>
                                                      <input 
                                                         type="text" 
                                                         value={newName}
                                                         onChange={(e) => setNewName(e.target.value)} 
                                                      />
                                                      <label htmlFor="number">Price:</label>
                                                      <input 
                                                         type="number" 
                                                         value={newPrice}
                                                         onChange={(e) => setNewPrice(e.target.value)} 
                                                      />
                                                      {/* later add functionality for this one */}
                                                      <label htmlFor="text">Quantity:</label>
                                                      <input 
                                                         type="text" 
                                                         value="" 
                                                         disabled
                                                      />
                                                      <button className='btn secondary-btn' 
                                                         onClick={() => updateProduct(currentProduct)}
                                                         disabled={newImage === product.product_img && newName === product.product_name && newPrice === product.product_price}
                                                      >
                                                         Save changes
                                                      </button>
                                                   </form>
                                                </div>
                                             </RemoveScroll>
                                          </div>
                                       )}
                                       {deletePopup === product.product_id && (
                                          <div className="popup" onClick={() => deleteProductPopup(false)}>
                                             <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                                                <p className='confirmation'>Do you wanna remove <span className='confirmation-product'>{product.product_name}?</span></p>
                                                <button className='btn secondary-btn' onClick={() => {deleteProduct(product.product_id), deleteProductPopup(false)}}>Yes</button>
                                                <button className='btn logout-btn' onClick={() => deleteProductPopup(false)}>No</button>
                                                <button className='btn close-btn' onClick={()=> deleteProductPopup(false)}>&#10006;</button>
                                             </div>
                                          </div>
                                       )}
                                    </div>
                                 ))}
                                 <CreateProductC addProduct={addProductToList} isAdmin={isAdmin}/>
                              </>
                           )
                        }
                     </div>
                  }

                  {activeBtn === 'make' && 
                     <div className='product-list make'>
                        <p>IN PROGRESS</p>
                     </div>
                  }
               </div>

               {isAdmin
                  ? (
                     <>
                     </>
                  )
                  : (
                     <div className='left-section'>
                        <h3>
                           SELECTIONS FOR EACH ONE OF YOU, YOUR FAMILY AND ODF COURSE YOUR FRIENDS TO ENJOY! 
                           <span className='max-users'> (MAX 10)</span>
                        </h3>

                        <img src={select_product_img} alt="" className="select-product-img"/>
                        <div className='purchase-container'>
                           <h3 className='purchase-title'>
                              PURCHASE DETAILS
                           </h3>
                           <div className='cart-list'>
                              {cartItems.length === 0 
                                 ? (
                                    <>
                                       <p>It looks like there&apos;s nothing here, get some!</p>
                                       <button className='secondary-btn cart-buy-btn btn' disabled>BUY NOW</button>
                                    </>
                                 ) 
                                 : (
                                    <>
                                       {cartItems.map((item, index) => (
                                          <div className='cart-items' key={index}>
                                             <p>x{item.quantity} {item.name}</p>
                                             <p>${item.price} <Currency/></p>
                                          </div>
                                       ))}
                                       <hr/>
                                       <div className='purchase-total'>
                                          <p>TOTAL AMOUNT:</p>
                                          <p>${totalPrice} <Currency/></p>
                                       </div>
                                       <button className='secondary-btn cart-buy-btn btn'>BUY NOW</button>
                                    </>
                                 )
                              }
                           </div>
                        </div>
                     </div>
                  )
               }
            </div>

         </motion.div>
      </div>
   )
}
