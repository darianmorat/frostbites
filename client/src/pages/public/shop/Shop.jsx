/* eslint-disable react/prop-types */
// USE REACT MODAL FOR POPUPS

import { useState, useEffect } from 'react';
import { motion } from "motion/react"
import { toast } from 'react-toastify'
import api from '../../../../api/axios';

// Move components to index.jsx
import { CreateProduct } from '../../../components/adminActions/CreateProduct'
import { EditProduct } from '../../../components/adminActions/EditProduct'
import { DeleteProduct } from '../../../components/adminActions/DeleteProduct';
import { CartSection } from '../../../components/cart/CartSection'

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
         toast.error(err.response.data.message)
      }
   }

   useEffect(() => {
      getProducts(); 
   }, []);

   const addProductToList = (newProduct) => {
      setProducts(prevProducts => [...prevProducts, newProduct]);
   };

   // ==============
   // DELETE PRODUCT 
   // ==============

   const [deletePopup, setDeletePopup] = useState(null)

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

   return (
      <div className='shop-page'>
         <motion.div 
            initial={{ opacity: 0, x: -100 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 100 }} 
            transition={{ duration: 0.7 }}
         >
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
                           ? 
                           <div className='no-product-available'>
                              <p>It seems like there&apos;s no products available</p>

                              <CreateProduct 
                                 addProduct={addProductToList} 
                                 isAdmin={isAdmin}
                              />
                           </div>
                           :
                           <>
                              { products.map((product) => (
                                 <div key={product.product_id} className="product-item">
                                    <img
                                       src={product.product_img}
                                       alt={product.product_name}
                                       className="product-img"
                                    />
                                    <p className='product-price'> ${product.product_price} USD</p>
                                    <h2 className='product-name'> {product.product_name}</h2>

                                    <EditProduct 
                                       isAdmin={isAdmin}
                                       deleteProductPopup={deleteProductPopup}
                                       getProducts={getProducts}
                                       productId={product.product_id}
                                       productImg={product.product_img}
                                       productName={product.product_name}
                                       productPrice={product.product_price}
                                       cartItems={cartItems}
                                       addProductToCart={addProductToCart}
                                       removeProductFromCart={removeProductFromCart}
                                    />

                                    <DeleteProduct 
                                       productId={product.product_id}
                                       productName={product.product_name}
                                       products={products}
                                       setProducts={setProducts}
                                       deletePopup={deletePopup}
                                       deleteProductPopup={deleteProductPopup}
                                    /> 
                                 </div>
                              ))}

                              <CreateProduct 
                                 isAdmin={isAdmin}
                                 addProduct={addProductToList} 
                              />
                           </>
                        }
                     </div>
                  }

                  {activeBtn === 'make' && 
                     <div className='product-list make'>
                        <p>IN PROGRESS</p>
                     </div>
                  }
               </div>

               {!isAdmin &&
                     <CartSection cartItems={cartItems} totalPrice={totalPrice}/>
               }
            </div>

         </motion.div>
      </div>
   )
}
