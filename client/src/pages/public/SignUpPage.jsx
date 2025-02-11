import { useFormik } from 'formik'; // USE REACT HOOK FORM LATER INSTEAD
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { ShowPassword } from '../../components/ShowPassword';
import { BackBtn } from '../../components/BackBtn';
import { AnimatedContainer } from '../../components/AnimatedContainer';
import wave_svg from '../../assets/images/svg/wave.svg';
import '../public.css';
import { useUserStore } from '../../stores/useUserStore';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import auth from '../../firebaseConfig';

const SignUpPage = () => {
   const [showPassword, setShowPassword] = useState(false);
   const { signup, loading } = useUserStore();

   // min 7 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit
   const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;

   const formik = useFormik({
      initialValues: {
         name: '',
         email: '',
         password: '',
         confirmPassword: '',
      },
      validationSchema: Yup.object({
         name: Yup.string().min(4, 'Name must be at least 4 chars'),
         email: Yup.string().email('Please enter a valid email'),
         password: Yup.string().matches(passwordRules, {
            message: 'Please create a stronger password',
         }),
         confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match',
         ),
      }),
      onSubmit: async (values) => {
         values.email = values.email.toLowerCase();
         await signup(values);
      },
   });

   const handleToast = () => {
      toast.dismiss('toast');
   };

   const handleGoogleSignup = async () => {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      try {
         const user = res.user;
         const values = {
            name: user.displayName,
            email: user.email,
            auth_provider: 'google',
         };
         await signup(values);
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
                  <BackBtn path={'/login'} />
                  <h3 className="form-title">Feel free to join the FROSTBITES family!</h3>
                  <div className="stick-container">
                     <div className="stick longer-stick"></div>
                     <div className="stick smaller-stick"></div>
                  </div>
                  <p className="form-description">
                     Sign up and save amazing Bonuses for you and your family together!
                  </p>
               </div>

               <div className="right-form">
                  <button className="btn google-auth" onClick={handleGoogleSignup}>
                     Signup with Google
                  </button>
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
                     <label
                        htmlFor="confirmPassword"
                        className={
                           formik.touched.confirmPassword && formik.errors.confirmPassword
                              ? 'label-error'
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
                           !formik.values.name ||
                           !formik.values.email ||
                           !formik.values.password
                        }
                     >
                        {loading ? <>Creating Account...</> : <>SignUp</>}
                     </button>
                  </form>
                  <div className="link login-link">
                     <p className="description">Already have an account?</p>
                     <Link to="/login" onClick={handleToast}>
                        Login
                     </Link>
                  </div>
               </div>
            </div>
         </AnimatedContainer>
      </div>
   );
};

export default SignUpPage;
