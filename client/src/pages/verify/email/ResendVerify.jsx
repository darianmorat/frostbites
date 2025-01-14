import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { motion } from "motion/react"
import api from '../../../../api/axios'
import { useState } from "react";

import wave_svg from '../../../assets/images/svg/wave.svg'
// import '../../auth/register/register.css'

export const ResendVerify = () => {
   const [loading, setLoading] = useState(false)

   const formik = useFormik({
      initialValues: {
         email: "",
      },
      validationSchema: Yup.object({
         email: Yup.string().email("Invalid email address"),
      }),
      onSubmit: async (values) => {
         setLoading(true)

         try {
            const res = await api.post('/verify/resend-verify-email', values)
            const data = res.data;

            if (data.success){
               toast.success(data.message)
            }

         } catch (err) {
            if (err.response) {
               toast.error(err.response.data.message);
            } else {
               toast.error("Server error. Please try again later.");
            }
         } finally {
            setLoading(false)
         }
      }
   })

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
                     <button 
                        type='submit' 
                        className='btn secondary-btn btn-submit' 
                        disabled={loading || !formik.values.email}
                     >
                     {loading 
                        ? 
                        <>SENDING...</>
                        : 
                        <>RESEND EMAIL</> 
                     }
                     </button>
                  </form>
               </div>
            </div>
         </motion.div>
      </div>
   )
}
