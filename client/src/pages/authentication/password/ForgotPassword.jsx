import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/axios";

import wave_svg from '../../../assets/images/svg/wave.svg'

export const ForgotPassword = () => {
   const formik = useFormik({
      initialValues: {
         email: "",
      },
      validationSchema: Yup.object({
         email: Yup.string().email("Invalid email address").required("Required"),
      }),
      onSubmit: async (values) => {
         try {
            const res = await api.post('/password/forgot-password', values)
            const data = res.data;

            if (data.success) {
               toast.success(data.message);
            } 

         } catch (err) {
            console.log(err.response);
            if (err.response.status === 404) {
               toast.error("Email not found");
            } else {
               toast.error("Server error");
            }
         }
      },
   });

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
                  <h3 className='form-title'>EASY WAY TO RESET YOUR PASSWORD</h3>
                  <div className='stick-container'>
                     <div className='stick longer-stick'></div>
                     <div className='stick smaller-stick'></div>
                  </div>
                  <p className='form-description'>
                     Use your email address in the input box, after that you will receive an email valid for the next 10min
                  </p>
               </div>

               <div className='right-form'>
                  <form onSubmit={formik.handleSubmit} className="form">
                     <label
                        htmlFor="email"
                        className={ `${ formik.touched.email && formik.errors.email ? "label-error" : "" }` } 
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
                     <button type='submit' className='btn secondary-btn btn-submit' disabled={!formik.values.email}>SEND EMAIL</button>
                  </form>
               </div>
            </div>

         </motion.div>

         {/* SEND BACK TO WHERE THE USER WAS, NOT TO THE HOME */}
         <button className='btn primary-btn back-btn' onClick={() => navigate('/login')}>↩ Go back</button>
      </div>
   );
};
