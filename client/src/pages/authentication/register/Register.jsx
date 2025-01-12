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
import './register.css'

export const Register = ({ setAuth }) => {
   const formik = useFormik({
      initialValues: {
         name: "",
         email: "",
         password: ""
      },
      validationSchema: Yup.object({
         name: Yup.string().min(4, "Name must be at least 4 chars"),
         email: Yup.string().email("Invalid email address"),
         password: Yup.string().min(8, "Password must be at least 8 chars")
      }),
      onSubmit: async (values) => {
         try {
            const res = await api.post('/authentication/register', values)
            const data = res.data;

            if (data.token) {
               localStorage.setItem("token", data.token);
               setAuth(true);
               if (data.isAdmin) {
                  localStorage.setItem("admin", data.isAdmin);
                  toast.success("Admin Registered Successfully")
               } else {
                  toast.success("Registered Successfully");
               }
            } 

         } catch (err) {
            if (err.response) {
               toast.error(err.response.data.message);
            } else {
               toast.error("Server error. Please try again later.");
            }
            setAuth(false);
         }
      }
   })

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
                  <h3 className='form-title'>FEEL FREE TO JOIN FROST BITES!</h3>
                  <div className='stick-container'>
                     <div className='stick longer-stick'></div>
                     <div className='stick smaller-stick'></div>
                  </div>
                  <p className='form-description'>Register and save amazing BONUSES for you and your family together!</p>
               </div>

               <div className='right-form'>
                  <div className='google-auth'>Continue with Google</div>
                  <p className='separator'>
                     <div className='separator-line'></div> or <div className='separator-line'></div> 
                  </p>
                  <form className='form' onSubmit={formik.handleSubmit}>
                     <label
                        htmlFor="name"
                        className={`${ formik.touched.name && formik.errors.name ? "label-error" : "" }`} 
                     >
                        {formik.touched.name && formik.errors.name ? formik.errors.name : "Name:"}
                     </label>
                     <input 
                        type="name"
                        className={`input ${ formik.touched.name && formik.errors.name ? "input-error" : "" }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        value={formik.values.name}
                        name="name"
                        id="name"
                     />
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
                     <label
                        htmlFor="password"
                        className={`${ formik.touched.password && formik.errors.password ? "label-error" : "" }`} 
                     >
                        {formik.touched.password && formik.errors.password ? formik.errors.password : "Password:"}
                     </label>
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
                     <button type='submit' className='btn secondary-btn btn-submit' disabled={!formik.values.name || !formik.values.email || !formik.values.password}>REGISTER</button>
                  </form>
                  <div className='link login-link'>
                     <p className='description'>Already have an account?</p>
                     <Link to='/login'>LOGIN</Link>
                  </div>
               </div>
            </div>
         </motion.div>

         {/* SEND BACK TO WHERE THE USER WAS, NOT TO THE HOME */}
         <button className='btn primary-btn back-btn' onClick={() => navigate('/')}>↩ Go back</button>
      </div>
   )
}
