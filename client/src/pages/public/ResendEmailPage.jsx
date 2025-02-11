import { useFormik } from 'formik'; // USE REACT HOOK FORM LATER INSTEAD
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useState } from 'react';
import api from '../../../api/axios';
import { BackBtn } from '../../components/BackBtn';
import { AnimatedContainer } from '../../components/AnimatedContainer';
import wave_svg from '../../assets/images/svg/wave.svg';
import '../public.css';

const ResendEmailPage = () => {
   const [loading, setLoading] = useState(false);

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

         <AnimatedContainer>
            <div className="form-container">
               <div className="left-form">
                  <BackBtn path={'/login'} />
                  <h3 className="form-title">Did not receive our email?</h3>
                  <div className="stick-container">
                     <div className="stick longer-stick"></div>
                     <div className="stick smaller-stick"></div>
                  </div>
                  <p className="form-description">
                     Do not worry, we will send you a second one to confirm your
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
                        {loading ? <>Sending...</> : <>Resend email</>}
                     </button>
                  </form>
               </div>
            </div>
         </AnimatedContainer>
      </div>
   );
};

export default ResendEmailPage;
