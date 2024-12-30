/* eslint-disable react/prop-types */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './register.css'

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const Register = ({ setAuth }) => {
   const [inputs, setInputs] = useState({
      name: "",
      email: "",
      password: ""
   })

   const { name, email, password } = inputs

   const onChange = (e) => {
      setInputs({ ...inputs, [e.target.name] : e.target.value })
   }

   const onSubmitForm = async (e) => {
      e.preventDefault()
      try {
         const body = { name, email, password }

         // const res = await axios.post(REGISTER_URL,
         //    JSON.stringify({ name, email, pwd }),
         //    {
         //       headers: { 'Content-Type': 'application/json' },
         //       withCredentials: true
         //    }
         // );

         const res = await fetch(
            "http://localhost:3000/authentication/register",
            {
               method: "POST",
               headers: {
                  "Content-type": "application/json"
               },
               body: JSON.stringify(body)
            }
         );

         const parseRes = await res.json();

         if (parseRes.token) {
            localStorage.setItem("token", parseRes.token);
            setAuth(true);
            if (parseRes.isAdmin) {
               localStorage.setItem("admin", parseRes.isAdmin);
               toast.success("Admin Registered Successfully")
            } else {
               toast.success("Registered Successfully");
            }
         } else {
            setAuth(false);
            toast.error(parseRes.message);
         }

      } catch (err) {
         console.error(err)
      }
   }

   return (
      <div className='form-body'>
         <div className='form-container'>
            <div className='left-form'>
               <h1 className='form-title'>FEEL FREE TO JOIN FROST BITES!</h1>
               <div className='stick-container'>
                  <div className='stick longer-stick'></div>
                  <div className='stick smaller-stick'></div>
               </div>
               <p className='form-description'>Register and save amazing BONUSES for you and your family together!</p>
            </div>

            <div className='right-form'>
               <div className='google-auth'>Continue with Google</div>
               <p className='separator'>
                  <div className='separator-line'></div> or <div className='separator-line'></div> 
               </p>
               <form className='form' onSubmit={onSubmitForm}>
                  <input 
                     type="name" 
                     name="name" 
                     placeholder="name" 
                     value={name} 
                     onChange={e => onChange(e)}
                  />
                  <input 
                     type="email" 
                     name="email" 
                     placeholder="email"
                     value={email} 
                     onChange={e => onChange(e)}
                  />
                  <input 
                     type="password" 
                     name="password" 
                     placeholder="password"
                     value={password} 
                     onChange={e => onChange(e)}
                  />
                  <button className='auth-btn btn-submit'>REGISTER</button>
               </form>
               <div className='link login-link'>
                  <p className='description'>Already have an account?</p>
                  <Link to='/login'>LOGIN</Link>
               </div>
            </div>
         </div>

         <button className='btn back-btn'>
            <Link to='/'>↩ Go back</Link>
         </button>
      </div>
   )
}

