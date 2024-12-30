/* eslint-disable react/prop-types */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export const Login = ({ setAuth }) => {
   const [inputs, setInputs] = useState({
      email: "",
      password: ""
   })

   const { email, password } = inputs

   const onChange = (e) => {
      setInputs({ ...inputs, [e.target.name] : e.target.value })
   }

   const onSubmitForm = async (e) => {
      e.preventDefault()
      try {
         const body = { email, password }

         const res = await fetch(
            "http://localhost:3000/authentication/login",
            {
               method: "POST",
               headers: {
                  "Content-type": "application/json"
               },
               body: JSON.stringify(body)
            }
         );

         const parseRes = await res.json();

         if (parseRes.token) {
            localStorage.setItem("token", parseRes.token);
            setAuth(true);

            if (parseRes.isAdmin) {
               localStorage.setItem("admin", parseRes.isAdmin);
               toast.success("Welcome Admin!")
            } else {
               toast.success("Logged in Successfully")
            }
         } else {
            setAuth(false);
            toast.error(parseRes.message);
         }

      } catch (err) {
         console.error(err)
      }
   }

   return (
      <div className='form-body'>
         <div className='form-container'>
            <div className='left-form'>
               <h1 className='form-title'>WELCOME BACK TO ICE CREAM SHOP</h1>
               <div className='stick-container'>
                  <div className='stick longer-stick'></div>
                  <div className='stick smaller-stick'></div>
               </div>
               <p className='form-description'>Log in to continue to your account and save more BONUSES for each purchase!</p>
            </div>

            <div className='right-form'>
               <div className='google-auth'>Continue with Google</div>
               <p className='separator'>
                  <div className='separator-line'></div> or <div className='separator-line'></div> 
               </p>
               <form className='form' onSubmit={onSubmitForm}>
                  <input 
                     type="email" 
                     name="email" 
                     placeholder="email"
                     value={email} 
                     onChange={e => onChange(e)}
                  />
                  <input 
                     type="password" 
                     name="password" 
                     placeholder="password"
                     value={password} 
                     onChange={e => onChange(e)}
                  />
                  <button className='auth-btn btn-submit'>LOGIN</button>
               </form>
               <div className='link register-link'>
                  <p className='description'>Dont have an account?</p>
                  <Link to='/register'>REGISTER</Link>
               </div>
            </div>
         </div>

         <button className='btn back-btn'>
            <Link to='/'>↩ Go back</Link>
         </button>
      </div>
   )
}
