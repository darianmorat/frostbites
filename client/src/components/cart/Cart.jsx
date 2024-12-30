import { Link } from "react-router-dom"
import './cart.css'
import 'boxicons'

export const Cart = () => { 
   return(
      <div>
         <button className="btn floating-cart">
            <Link to='/shop'>
               <i className='bx bx-cart-alt bx-tada-hover bx-lg bx-border'></i>
            </Link>
         </button>
      </div>
   )
}
