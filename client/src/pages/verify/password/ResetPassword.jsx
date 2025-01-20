import { useFormik } from 'formik'; // USE REACT HOOK FORM LATER INSTEAD
import * as Yup from 'yup';
import api from '../../../../api/axios.jsx';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { ShowPassword } from '../../../components';
import { useState } from 'react';

import wave_svg from '../../../assets/images/svg/wave.svg';
import { useNavigate } from 'react-router-dom';

export const ResetPassword = () => {
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const formik = useFormik({
      initialValues: {
         newPassword: '',
         confirmPassword: '',
      },
      validationSchema: Yup.object({
         newPassword: Yup.string().min(8, 'Password must be at least 8 chars'),
         confirmPassword: Yup.string().oneOf(
            [Yup.ref('newPassword'), null],
            'Passwords must match',
         ),
      }),
      onSubmit: async (values) => {
         setLoading(true);

         try {
            const { newPassword } = values;
            const token = window.location.pathname.split('/').pop();

            const res = await api.post(`/verify/reset-password/${token}`, {
               newPassword,
            });
            const data = res.data;

            if (data.success) {
               navigate('/login');
               toast.success(data.message);
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

   const [showPassword, setShowPassword] = useState(false);

   return (
      <div className="form-body">
         <img src={wave_svg} alt="" className="wave-left-svg" />
         <img src={wave_svg} alt="" className="wave-right-svg" />

         <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4 }}
         >
            <div className="form-container">
               <div className="left-form">
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
                     <label
                        htmlFor="newPassword"
                        className={
                           formik.touched.newPassword && formik.errors.newPassword
                              ? 'red-text'
                              : ''
                        }
                     >
                        {formik.touched.newPassword && formik.errors.newPassword
                           ? formik.errors.newPassword
                           : 'New Password:'}
                     </label>
                     <div className="input-container">
                        <input
                           type={showPassword ? 'text' : 'password'}
                           name="newPassword"
                           id="newPassword"
                           className={`input ${formik.touched.newPassword && formik.errors.newPassword ? 'input-error' : ''}`}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.newPassword}
                        />
                        <ShowPassword
                           showPassword={showPassword}
                           setShowPassword={setShowPassword}
                        />
                     </div>
                     <label
                        htmlFor="confirmPassword"
                        className={
                           formik.touched.confirmPassword && formik.errors.confirmPassword
                              ? 'red-text'
                              : ''
                        }
                     >
                        {formik.touched.confirmPassword && formik.errors.confirmPassword
                           ? formik.errors.confirmPassword
                           : 'Confirm Password:'}
                     </label>
                     <div className="input-container">
                        <input
                           type={showPassword ? 'text' : 'password'}
                           name="confirmPassword"
                           id="confirmPassword"
                           className={`input ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'input-error' : ''}`}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.confirmPassword}
                        />
                        <ShowPassword
                           showPassword={showPassword}
                           setShowPassword={setShowPassword}
                        />
                     </div>
                     <button
                        type="submit"
                        className="btn secondary-btn btn-submit"
                        disabled={
                           loading ||
                           !formik.values.newPassword ||
                           !formik.values.confirmPassword
                        }
                     >
                        {loading ? <>RESETTING...</> : <>RESET PASSWORD</>}
                     </button>
                  </form>
               </div>
            </div>
         </motion.div>
      </div>
   );
};
