/* eslint-disable react/prop-types */

import { useFormik } from 'formik'; // USE REACT HOOK FORM LATER INSTEAD
import * as Yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ShowPassword, BackBtn } from '../../../components';
import api from '../../../../api/axios';

import wave_svg from '../../../assets/images/svg/wave.svg';
import '../../index.css';

export const Register = ({ setAuth }) => {
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const navigate = useNavigate();

   const location = useLocation();
   const toastId = 'unique-toast';
   useEffect(() => {
      toast.dismiss(toastId);
   }, [location]);

   const formik = useFormik({
      initialValues: {
         name: '',
         email: '',
         password: '',
      },
      validationSchema: Yup.object({
         name: Yup.string().min(4, 'Name must be at least 4 chars'),
         email: Yup.string().email('Invalid email address'),
         password: Yup.string().min(8, 'Password must be at least 8 chars'),
      }),
      onSubmit: async (values) => {
         values.email = values.email.toLowerCase()
         setLoading(true);

         try {
            const res = await api.post('/auth/register', values);
            const data = res.data;

            if (data.success) {
               navigate('/verify-email', { state: { email: values.email } });
               toast.info(data.message);
            }
         } catch (err) {
            if (err.response) {
               toast.error(err.response.data.message);

               if (err.response.data.message === 'User already exists') {
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
                  <h3 className="form-title">FEEL FREE TO JOIN FROST BITES!</h3>
                  <div className="stick-container">
                     <div className="stick longer-stick"></div>
                     <div className="stick smaller-stick"></div>
                  </div>
                  <p className="form-description">
                     Register and save amazing BONUSES for you and your family together!
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
                        htmlFor="name"
                        className={`${formik.touched.name && formik.errors.name ? 'label-error' : ''}`}
                     >
                        {formik.touched.name && formik.errors.name
                           ? formik.errors.name
                           : 'Name:'}
                     </label>
                     <input
                        type="name"
                        className={`input ${formik.touched.name && formik.errors.name ? 'input-error' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        name="name"
                        id="name"
                        autoComplete="name"
                     />
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
                     <label
                        htmlFor="password"
                        className={`${formik.touched.password && formik.errors.password ? 'label-error' : ''}`}
                     >
                        {formik.touched.password && formik.errors.password
                           ? formik.errors.password
                           : 'Password:'}
                     </label>
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
                     <button
                        type="submit"
                        className="btn secondary-btn btn-submit"
                        disabled={
                           loading ||
                           !formik.values.name ||
                           !formik.values.email ||
                           !formik.values.password
                        }
                     >
                        {loading ? <>CREATING ACCOUNT...</> : <>REGISTER</>}
                     </button>
                  </form>
                  <div className="link login-link">
                     <p className="description">Already have an account?</p>
                     <Link to="/login">LOGIN</Link>
                  </div>
               </div>
            </div>
         </motion.div>
      </div>
   );
};
