import { useFormik } from 'formik'; // USE REACT HOOK FORM LATER INSTEAD
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useState } from 'react';
import api from '../../../api/axios';
import { BackBtn } from '../../components/BackBtn';
import { AnimatedContainer } from '../../components/AnimatedContainer';
import wave_svg from '../../assets/images/svg/wave.svg';
import '../public.css';

const ForgotPasswordPage = () => {
   const [loading, setLoading] = useState(false);
   const [confirmation, setConfirmation] = useState(false);
   const [resent, setResent] = useState(false);

   const formik = useFormik({
      initialValues: {
         email: '',
      },
      validationSchema: Yup.object({
         email: Yup.string().email('Invalid email'),
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

         <AnimatedContainer>
            <div className="form-container">
               <div className="left-form">
                  <BackBtn path={'/login'} />
                  <h3 className="form-title">Easy way to reset your password</h3>
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
                              {loading ? <>Sending...</> : <>Send Email</>}
                           </button>
                        </>
                     ) : (
                        <>
                           {resent ? (
                              <p className="form-description">
                                 Email resent, please check
                                 <span className="your-email">
                                    {' '}
                                    {formik.values.email}{' '}
                                 </span>
                                 for instructions to reset your password!
                              </p>
                           ) : (
                              <p className="form-description">
                                 Check
                                 <span className="your-email">
                                    {' '}
                                    {formik.values.email}{' '}
                                 </span>
                                 for instructions to reset your password!
                              </p>
                           )}
                           <button
                              type="submit"
                              className="btn secondary-btn btn-submit"
                              disabled={loading || !formik.values.email || resent}
                              onClick={() => setResent(true)}
                           >
                              {loading ? <>Resending...</> : <>Resend Email</>}
                           </button>
                           <button
                              type="submit"
                              className="btn secondary-btn-alt btn-submit"
                              onClick={() => setConfirmation(false)}
                           >
                              Change Email
                           </button>
                        </>
                     )}
                  </form>
               </div>
            </div>
         </AnimatedContainer>
      </div>
   );
};

export default ForgotPasswordPage;
