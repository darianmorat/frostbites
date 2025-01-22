import { useFormik } from 'formik'; // USE REACT HOOK FORM LATER INSTEAD
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useState } from 'react';
import api from '../../../../api/axios';

import { BackBtn } from '../../../components/inputActions/BackBtn';

import wave_svg from '../../../assets/images/svg/wave.svg';

export const ForgotPassword = () => {
   const [loading, setLoading] = useState(false);
   const [confirmation, setConfirmation] = useState(false);

   const formik = useFormik({
      initialValues: {
         email: '',
      },
      validationSchema: Yup.object({
         email: Yup.string().email('Invalid email address').required('Required'),
      }),
      onSubmit: async (values) => {
         setLoading(true);

         try {
            const res = await api.post('/verify/forgot-password', values);
            const data = res.data;

            if (data.success) {
               toast.info(data.message);
               setConfirmation(true);
            }
         } catch (err) {
            if (err.response) {
               toast.error(err.response.data.message);
            }
         } finally {
            setLoading(false);
         }
      },
   });

   return (
      <div className="form-body">
         <img src={wave_svg} alt="" className="wave-left-svg" />
         <img src={wave_svg} alt="" className="wave-right-svg" />
         <img src={wave_svg} alt="" className="wave-left-svg base" />
         <img src={wave_svg} alt="" className="wave-right-svg base" />

         <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4 }}
         >
            <div className="form-container">
               <div className="left-form">
                  <BackBtn />
                  <h3 className="form-title">EASY WAY TO RESET YOUR PASSWORD</h3>
                  <div className="stick-container">
                     <div className="stick longer-stick"></div>
                     <div className="stick smaller-stick"></div>
                  </div>
                  <p className="form-description">
                     Use your email address in the input box, after that you will receive
                     an email valid for the next 10min
                  </p>
               </div>

               <div className="right-form">
                  <form onSubmit={formik.handleSubmit} className="form">
                     {!confirmation ? (
                        <>
                           {' '}
                           <label
                              htmlFor="email"
                              className={`${formik.touched.email && formik.errors.email ? 'label-error' : ''}`}
                           >
                              {formik.touched.email && formik.errors.email
                                 ? formik.errors.email
                                 : 'Email:'}
                           </label>
                           <input
                              type="email"
                              className={`input ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.email}
                              name="email"
                              id="email"
                              autoComplete="email"
                           />
                           <button
                              type="submit"
                              className="btn secondary-btn btn-submit"
                              disabled={loading || !formik.values.email}
                           >
                              {loading ? <>SENDING...</> : <>SEND EMAIL</>}
                           </button>
                        </>
                     ) : (
                        <>
                           <p className="form-description">
                              Check{' '}
                              <span className="your-email">{formik.values.email}</span>{' '}
                              for instructions to reset your password.
                           </p>
                           <button
                              type="submit"
                              className="btn secondary-btn btn-submit"
                              disabled={loading || !formik.values.email}
                           >
                              {loading ? <>RESENDING...</> : <>RESEND EMAIL</>}
                           </button>
                           <button
                              type="submit"
                              className="btn secondary-btn-alt btn-submit"
                              onClick={() => setConfirmation(false)}
                           >
                              CHANGE EMAIL
                           </button>
                        </>
                     )}
                  </form>
               </div>
            </div>
         </motion.div>
      </div>
   );
};
