// /* eslint-disable react/prop-types */
//
// import { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'
// import './profile.css'
//
// export const Profile = ({ setAuth }) => {
//    const [name, setName] = useState('')
//    const [email, setEmail] = useState('')
//    const [created, setCreated] = useState('')
//
//    const getProfile = async () => {
//       try {
//          const res = await fetch('http://localhost:3000/user', {
//             method: "GET",
//             headers: { token: localStorage.token }
//          });
//
//          const parseData = await res.json();
//
//          // convert date
//          const dateString = parseData.created_at;
//          const date = new Date(dateString);
//
//          // Convert to 'Month Day, Year' format (e.g., "December 27, 2024")
//          const formattedDate = date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//          });
//
//          console.log(parseData)
//          setName(parseData.user_name);
//          setEmail(parseData.user_email);
//          setCreated(formattedDate);
//       } catch (err) {
//          console.error(err);
//       }
//    }
//
//    const logout = async (e) => {
//       e.preventDefault();
//       try {
//          localStorage.removeItem("token");
//          localStorage.removeItem("admin");
//          setAuth(false);
//          toast.success("Logout successfully");
//       } catch (err) {
//          console.error(err);
//       }
//    };
//
//    useEffect(() => {
//       getProfile()
//    }, [])
//
//    return (
//       <>
//          <h1>Profile</h1>
//          <h2 className='name'>Username: {name}</h2>
//          <h2 className='name'>Email: {email}</h2>
//          <h2 className='name'>Created at: {created}</h2>
//          <button onClick={e => logout(e)}>Logout</button>
//       </>
//    )
// }

/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './profile.css'

export const Profile = ({ setAuth }) => {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [created, setCreated] = useState('')

   // const [newName, setNewName] = useState('')  // For updated username
   // const [newEmail, setNewEmail] = useState('') // For updated email

   // Fetching the profile data
   const getProfile = async () => {
      try {
         const res = await fetch('http://localhost:3000/user', {
            method: "GET",
            headers: { token: localStorage.token }
         });

         const parseData = await res.json();

         // Convert date
         const dateString = parseData.created_at;
         const date = new Date(dateString);

         const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
         });

         setName(parseData.user_name);
         setEmail(parseData.user_email);
         setCreated(formattedDate);
          
         // setNewName(parseData.user_name);  // Set initial name to edit
         // setNewEmail(parseData.user_email); // Set initial email to edit
      } catch (err) {
         console.error(err);
      }
   }

   // Logout function
   const logout = async (e) => {
      e.preventDefault();
      try {
         localStorage.removeItem("token");
         localStorage.removeItem("admin");
         setAuth(false);
         toast.success("Logout successfully");
      } catch (err) {
         console.error(err);
      }
   };

   // Update user info
   const updateProfile = async () => {
      try {
         const res = await fetch('http://localhost:3000/user/update', {
            method: "PUT",
            headers: {
               'Content-Type': 'application/json',
               token: localStorage.token
            },
            body: JSON.stringify({
               user_name: name,
               user_email: email
            })
         });

         const parseRes = await res.json();
         console.log(parseRes)

         if (parseRes.success) {
            toast.success("Profile updated successfully");
            setName(name);  // Update the displayed name
            setEmail(email);  // Update the displayed email
         } else {
            toast.error("Failed to update profile"); // check if is the same don't let change the info
         }
      } catch (err) {
         console.error(err);
         toast.error("Error updating profile");
      }
   }

   useEffect(() => {
      getProfile()
   }, [])

   return (
      <>
         <h1>Profile</h1>
         <h2 className='name'>Username: 
            <input 
               type="text" 
               value={name} 
               onChange={(e) => setName(e.target.value)} 
            />
         </h2>
         <h2 className='name'>Email: 
            <input 
               type="email" 
               value={email} 
               onChange={(e) => setEmail(e.target.value)} 
            />
         </h2>
         <h2 className='name'>Created at:</h2>
         <h3> {created}</h3>
         <button onClick={updateProfile}>Save Changes</button>
         <button onClick={e => logout(e)}>Logout</button>
      </>
   )
}

