/* eslint-disable react/prop-types */

import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from "motion/react"
import { useState } from "react";
import api from '../../../../api/axios'
import { ShowPassword } from "../../../components";

import wave_svg from '../../../assets/images/svg/wave.svg'

export const Login = ({ setAuth }) => {
   const formik = useFormik({
      initialValues: {
         email: "",
         password: ""
      },
      validationSchema: Yup.object({
         email: Yup.string().email("Invalid email address")
      }),
      onSubmit: async (values) => {
         try {
            const res = await api.post('/auth/login', values)
            const data = res.data;

            if (data.success) {
               localStorage.setItem("token", data.token);
               setAuth(true);

               if (data.isAdmin) {
                  localStorage.setItem("admin", data.isAdmin);
                  toast.success("Welcome Admin!")
               } else {
                  toast.success("Logged in Successfully")
               }
            } 

         } catch (err) {
            if (err.response) {
               toast.error(err.response.data.message);

               if (err.response.data.isVerified === false) {
                  toast.warning(
                     <>
                        <span>Did not receive the email? <br/>
                        <a href="/resend-verify-email">Click here to resend</a></span>
                     </>, 
                     {
                        autoClose: false,
                        closeOnClick: false,
                        draggable: false,
                        position: "top-right",
                     }
                  )
               }
            } else {
               toast.error("Server error. Please try again later.");
            }
            setAuth(false);
         }
      },
   });

   const [showPassword, setShowPassword] = useState(false)
   const navigate = useNavigate()

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
                  <form className='form' onSubmit={formik.handleSubmit}>
                     <label
                        htmlFor="email"
                        className={`${ formik.touched.email && formik.errors.email ? "label-error" : "" }`} 
                     >
                        {formik.touched.email && formik.errors.email ? formik.errors.email : "Email:"}
                     </label>
                     <input
                        type="email"
                        className={`input ${ formik.touched.email && formik.errors.email ? "input-error" : "" }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        value={formik.values.email}
                        name="email"
                        id="email"
                     />
                     <label htmlFor="password">Password:</label>
                     <div className="input-container">
                        <input
                           type={showPassword ? 'text' : 'password'}
                           className={`input ${ formik.touched.password && formik.errors.password ? "input-error" : "" }`}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur} 
                           value={formik.values.password}
                           name="password"
                           id="password"
                        />
                        <ShowPassword showPassword={showPassword} setShowPassword={setShowPassword}/>
                     </div>
                     <div className='link forgot-password'>
                        <Link to='/forgot-password'>Forgot password?</Link>
                     </div>
                     <button type='submit' className='btn secondary-btn btn-submit' disabled={!formik.values.email || !formik.values.password}>LOGIN</button>
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
