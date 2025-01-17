/* eslint-disable react/prop-types */

import select_product_img from '../../assets/images/svg/selection-product.svg'

export const CartSection = ({ cartItems, totalPrice }) => {

   return (
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
                              <p>${item.price} USD</p>
                           </div>
                        ))}
                        <hr/>
                        <div className='purchase-total'>
                           <p>TOTAL AMOUNT:</p>
                           <p>${totalPrice} USD</p>
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
                  
