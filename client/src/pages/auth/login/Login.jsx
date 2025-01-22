/* eslint-disable react/prop-types */

import { useFormik } from 'formik'; // USE REACT HOOK FORM LATER INSTEAD
import * as Yup from 'yup';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import api from '../../../../api/axios';

import { ShowPassword } from '../../../components/inputActions/ShowPassword';
import { BackBtn } from '../../../components/inputActions/BackBtn';

import wave_svg from '../../../assets/images/svg/wave.svg';

export const Login = ({ setAuth }) => {
   const location = useLocation();
   const toastId = 'unique-toast';
   useEffect(() => {
      toast.dismiss(toastId);
   }, [location]);

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: Yup.object({
         email: Yup.string().email('Invalid email address'),
      }),
      onSubmit: async (values) => {
         values.email = values.email.toLowerCase();

         try {
            const res = await api.post('/auth/login', values);
            const data = res.data;

            if (data.success) {
               localStorage.setItem('token', data.token);
               setAuth(true);
               toast.success('Logged in Successfully');
            }
         } catch (err) {
            if (err.response) {
               toast.error(err.response.data.message);

               if (err.response.data.message === 'Email or Password is incorrect') {
                  toast.dismiss(toastId);
               }

               if (err.response.data.isVerified === false) {
                  if (!toast.isActive(toastId)) {
                     toast.warning(
                        <>
                           <span>
                              Did not receive the email? <br />
                              <a href="/resend-email">Click here to resend</a>
                           </span>
                        </>,
                        {
                           toastId: toastId,
                           autoClose: false,
                           closeOnClick: false,
                           draggable: false,
                           position: 'top-right',
                        },
                     );
                  }
               }
            } else {
               toast.error('Server error. Please try again later.');
            }
            setAuth(false);
         }
      },
   });

   const [showPassword, setShowPassword] = useState(false);

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
                  <h3 className="form-title">WELCOME BACK TO ICE CREAM SHOP</h3>
                  <div className="stick-container">
                     <div className="stick longer-stick"></div>
                     <div className="stick smaller-stick"></div>
                  </div>
                  <p className="form-description">
                     Log in to continue to your account and save more BONUSES for each of
                     your purchases!
                  </p>
               </div>

               <div className="right-form">
                  <div className="google-auth">Continue with Google</div>
                  <p className="separator">
                     <span className="separator-line"></span> or{' '}
                     <span className="separator-line"></span>
                  </p>
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
                     <label htmlFor="password">Password:</label>
                     <div className="input-container">
                        <input
                           type={showPassword ? 'text' : 'password'}
                           className={`input ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.password}
                           name="password"
                           id="password"
                        />
                        <ShowPassword
                           showPassword={showPassword}
                           setShowPassword={setShowPassword}
                        />
                     </div>
                     <div className="link forgot-password">
                        <Link to="/forgot-password">Forgot password?</Link>
                     </div>
                     <button
                        type="submit"
                        className="btn secondary-btn btn-submit"
                        disabled={!formik.values.email || !formik.values.password}
                     >
                        LOGIN
                     </button>
                  </form>
                  <div className="link register-link">
                     <p className="description">Dont have an account?</p>
                     <Link to="/register">REGISTER</Link>
                  </div>
               </div>
            </div>
         </motion.div>
      </div>
   );
};
