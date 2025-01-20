import { useFormik } from 'formik'; // USE REACT HOOK FORM LATER INSTEAD
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { motion } from 'motion/react';
import { useState } from 'react';
import { BackBtn } from '../../../components';
import api from '../../../../api/axios';

import wave_svg from '../../../assets/images/svg/wave.svg';

export const ResendEmail = () => {
   const [loading, setLoading] = useState(false);

   const formik = useFormik({
      initialValues: {
         email: '',
      },
      validationSchema: Yup.object({
         email: Yup.string().email('Invalid email address'),
      }),
      onSubmit: async (values) => {
         setLoading(true);

         try {
            const res = await api.post('/verify/resend-email', values);
            const data = res.data;

            if (data.success) {
               toast.info(data.message);
            }
         } catch (err) {
            if (err.response) {
               toast.error(err.response.data.message);
            } else {
               toast.error('Server error. Please try again later.');
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
                  <BackBtn/>
                  <h3 className="form-title">DID NOT RECEIVE OUR EMAIL?</h3>
                  <div className="stick-container">
                     <div className="stick longer-stick"></div>
                     <div className="stick smaller-stick"></div>
                  </div>
                  <p className="form-description">
                     Do not worry, we will send you a sencond one to confirm your
                     verification!
                  </p>
               </div>

               <div className="right-form">
                  <form className="form" onSubmit={formik.handleSubmit}>
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
                        {loading ? <>SENDING...</> : <>RESEND EMAIL</>}
                     </button>
                  </form>
               </div>
            </div>
         </motion.div>
      </div>
   );
};
