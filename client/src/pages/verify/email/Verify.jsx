/* eslint-disable react/prop-types */

import { toast } from 'react-toastify'
import { motion } from "motion/react"
import api from '../../../../api/axios'
import { useState } from 'react'

import wave_svg from '../../../assets/images/svg/wave.svg'
// import '../../auth/register/register.css'

export const Verify = ({ setAuth }) => {
   const [loading, setLoading] = useState(false)

   const verifyUser = async () => {
      setLoading(true)

      try {
         const token = window.location.pathname.split("/").pop();

         const res = await api.get(`/verify/verify-email/${token}`)
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
         console.log(err.response);
         if (err.response) {
            toast.error(err.response.data.message);
         } else {
            toast.error("Server error. Please try again later.");
         }
      } finally {
         setLoading(false)
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
                  <h3 className='form-title'>VERIFY YOUR FROST BITES ACCOUNT!</h3>
                  <div className='stick-container'>
                     <div className='stick longer-stick'></div>
                     <div className='stick smaller-stick'></div>
                  </div>
                  <p className='form-description'>Click in the button to verify your account and continue into the app!</p>
               </div>

               <div className='right-form'>
                  <button 
                     type='submit' 
                     className='btn secondary-btn btn-submit' 
                     onClick={verifyUser}
                     disabled={loading}
                  >
                     {loading 
                        ? 
                        <>VERIFYING...</>
                        : 
                        <>VERIFY EMAIL</> 
                     }
                  </button>
               </div>
            </div>
         </motion.div>
      </div>
   )
}
