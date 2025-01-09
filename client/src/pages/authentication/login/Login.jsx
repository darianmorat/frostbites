/* eslint-disable react/prop-types */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from "motion/react"

import wave_svg from '../../../assets/images/svg/wave.svg'

export const Login = ({ setAuth }) => {
   const navigate = useNavigate()

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
         <img src={wave_svg} alt="" className="wave-left-svg"/>
         <img src={wave_svg} alt="" className="wave-right-svg"/>

         <motion.div 
            initial={{ opacity: 0, y: -100 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 100 }} 
            transition={{ duration: 0.4 }}
         >
            <div className='form-container'>
               <div className='left-form'>
                  <h3 className='form-title'>WELCOME BACK TO ICE CREAM SHOP</h3>
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
                     <button className='btn secondary-btn btn-submit'>LOGIN</button>
                  </form>
                  <div className='link register-link'>
                     <p className='description'>Dont have an account?</p>
                     <Link to='/register'>REGISTER</Link>
                  </div>
               </div>
            </div>
         </motion.div>

         {/* SEND BACK TO WHERE THE USER WAS, NOT TO THE HOME */}
         <button className='btn primary-btn back-btn' onClick={() => navigate('/')}>↩ Go back</button>
      </div>
   )
}
