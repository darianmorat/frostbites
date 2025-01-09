/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './profile.css';

export const Profile = ({ setAuth }) => {

   // Combine related states into one object
   const [profile, setProfile] = useState({
      name: '',
      email: '',
      created: ''
   });

   const [originalProfile, setOriginalProfile] = useState({});
   const [isChanged, setIsChanged] = useState(false);

   // ===========
   // GET PROFILE
   // ===========
   const getProfile = async () => {
      try {
         const res = await fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: { token: localStorage.token }
         });

         const parseData = await res.json();

         // Format the date
         const dateString = parseData.created_at;
         const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
         });

         // Set current and original profile values
         const newProfile = {
            name: parseData.user_name,
            email: parseData.user_email,
            created: formattedDate
         };

         setProfile(newProfile);
         setOriginalProfile(newProfile);

      } catch (err) {
         console.error(err);
      }
   };

   useEffect(() => {
      getProfile();
   }, []);

   // ========================
   // DYNAMIC CHANGE DETECTION
   // ========================
   useEffect(() => {
      setIsChanged(JSON.stringify(profile) !== JSON.stringify(originalProfile));
   }, [profile, originalProfile]);

   // ==============
   // UPDATE PROFILE
   // ==============
   const updateProfile = async () => {
      try {
         const res = await fetch('http://localhost:3000/user/update', {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               token: localStorage.token
            },
            body: JSON.stringify({
               user_name: profile.name,
               user_email: profile.email
            })
         });

         const parseRes = await res.json();

         if (parseRes.success) {
            toast.success(parseRes.message);

            // Update original profile after a successful save
            setOriginalProfile(profile);
            setIsChanged(false);
         } else {
            toast.error(parseRes.message);
         }

      } catch (err) {
         console.error(err);
         toast.error('Error updating profile');
      }
   };

   // ====================
   // HANDLE INPUT CHANGES
   // ====================
   const handleChange = (e) => {
      setProfile({
         ...profile,
         [e.target.name]: e.target.value
      });
   };

   // ============
   // LOGOUT MANAG
   // ============
   const navigate = useNavigate();

   const logout = async (e) => {
      e.preventDefault();
      try {
         localStorage.removeItem('token');
         localStorage.removeItem('admin');
         setAuth(false);
         toast.success('Logout successfully');
         navigate('/') // REDIRECT TO THIS ROUTE AFTER LOGOUT
      } catch (err) {
         console.error(err);
      }
   };

   // ================
   // RETURN COMPONENT
   // ================

   const [activeBtn, setActiveBtn] = useState('my-data');

   const toggleActive = (button) => {
      setActiveBtn(button);
   }

   return (
      <>
         <div className="profile-page">
            <div className='profile-banner'> </div>
            <div className='profile-container'>
               <div className='profile-picture-container'>
                  <div className='profile-picture'> </div>
                  <h2>Profile</h2>
               </div>
               <nav className='profile-nav'>
                  <button 
                     className={`my-data btn ${activeBtn === 'my-data' ? 'active' : 'inactive'}`}
                     onClick={() => toggleActive('my-data')}
                  >
                     My data
                  </button>
                  <button 
                     className={`preferences btn ${activeBtn === 'preferences' ? 'active' : 'inactive'}`}
                     onClick={() => toggleActive('preferences')}
                  >
                     Preferences
                  </button>
                  <button 
                     className={`notifications btn ${activeBtn === 'notifications' ? 'active' : 'inactive'}`}
                     onClick={() => toggleActive('notifications')}
                  >
                     Notifications
                  </button>
               </nav>

               {activeBtn === 'my-data' && 
                  <div className='my-data'>
                     <div className='my-data-inputs'>
                        <h3 className="my-data-name">Username:
                           <input
                              type="text"
                              name="name"
                              value={profile.name}
                              onChange={handleChange}
                           />
                        </h3>
                        <h3 className="my-data-email">Email:
                           <input
                              type="email"
                              name="email"
                              value={profile.email}
                              onChange={handleChange}
                           />
                        </h3>
                     </div>
                     <h3 className="my-data-created">Created at:<br />
                        {profile.created}
                     </h3>
                     <button className='secondary-btn my-data-save-btn btn' onClick={updateProfile} disabled={!isChanged}>
                        Save Changes
                     </button>
                     <button className='btn logout-btn' onClick={logout}>
                        Logout
                     </button>
                  </div>
               }

               {activeBtn === 'preferences' && 
                  <div className='my-data'>
                     <h3>IN PROGRESS</h3>
                     <p>Preferences</p>
                  </div>
               }

               {activeBtn === 'notifications' && 
                  <div className='my-data'>
                     <h3>IN PROGRESS</h3>
                     <p>Notifications</p>
                  </div>
               }
            </div>
         </div>
      </>
   );
};

