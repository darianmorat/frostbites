import { useFormik } from 'formik'; // USE REACT HOOK FORM LATER INSTEAD
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUserStore } from '../../stores/useUserStore';
import { ShowPassword } from '../../components/ShowPassword';
import { BackBtn } from '../../components/BackBtn';
import { AnimatedContainer } from '../../components/AnimatedContainer';
import wave_svg from '../../assets/images/svg/wave.svg';
import { toast } from 'react-toastify';
import '../public.css';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import auth from '../../firebaseConfig';

const LoginPage = () => {
   const [showPassword, setShowPassword] = useState(false);
   const { login } = useUserStore();

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: Yup.object({
         email: Yup.string().email('Invalid email'),
      }),
      onSubmit: async (values) => {
         values.email = values.email.toLowerCase();
         await login(values);
      },
   });

   const handleToast = () => {
      toast.dismiss('toast');
   };

   const handleGoogleLogin = async () => {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      try {
         const user = res.user;
         const values = {
            email: user.email,
            auth_provider: 'google',
         };
         await login(values);
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <div className="form-body">
         <img src={wave_svg} alt="" className="wave-left-svg" />
         <img src={wave_svg} alt="" className="wave-right-svg" />
         <img src={wave_svg} alt="" className="wave-left-svg base" />
         <img src={wave_svg} alt="" className="wave-right-svg base" />

         <AnimatedContainer>
            <div className="form-container">
               <div className="left-form">
                  <BackBtn path={'/'} />
                  <h3 className="form-title">Welcome back to FROSTBITES!</h3>
                  <div className="stick-container">
                     <div className="stick longer-stick"></div>
                     <div className="stick smaller-stick"></div>
                  </div>
                  <p className="form-description">
                     Log in to continue to your account and save more Bonuses for each of
                     your purchases!
                  </p>
               </div>

               <div className="right-form">
                  <button className="btn google-auth" onClick={handleGoogleLogin}>
                     Login with Google
                  </button>
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
                        Login
                     </button>
                  </form>
                  <div className="link register-link">
                     <p className="description">Dont have an account?</p>
                     <Link to="/signup" onClick={handleToast}>
                        SignUp
                     </Link>
                  </div>
               </div>
            </div>
         </AnimatedContainer>
      </div>
   );
};

export default LoginPage;
