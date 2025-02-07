import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../api/axios';
import { useUserStore } from '../../stores/useUserStore';
import { AnimatedContainer } from '../../components/AnimatedContainer';
import '../private.css';

const SettingsPage = () => {
   const { logout, updateUser, user, loading } = useUserStore();

   const [deletePopup, setDeletePopup] = useState(false);
   const [activeBtn, setActiveBtn] = useState('my-data');

   const [isChanged, setIsChanged] = useState(false);
   const [newName, setNewName] = useState('');
   const [newEmail, setNewEmail] = useState('');
   const [newBio, setNewBio] = useState('');
   const [newPhone, setNewPhone] = useState('');
   const [newAddress, setNewAddress] = useState('');

   // ===========
   // GET PROFILE
   // ===========

   useEffect(() => {
      if (user) {
         setNewName(user.name);
         setNewEmail(user.email);
         setNewBio(user.bio);
         setNewPhone(user.phone);
         setNewAddress(user.address);
      }
   }, [user]);

   // ==============
   // UPDATE PROFILE
   // ==============
   const updateProfile = async () => {
      const isChanged = await updateUser(newName, newEmail, newBio, newPhone, newAddress);
      if (isChanged) {
         setIsChanged(false);
      }
   };

   const handleChange = (e) => {
      const value = e.target.value;

      if (e.target.name === 'name') {
         setIsChanged(value !== user.name);
         setNewName(value);
      }

      if (e.target.name === 'email') {
         setIsChanged(value !== user.email);
         setNewEmail(value);
      }

      if (e.target.name === 'bio') {
         setIsChanged(value !== user.bio);
         setNewBio(value);
      }

      if (e.target.name === 'phone') {
         setIsChanged(value !== user.phone);
         setNewPhone(value);
      }

      if (e.target.name === 'address') {
         setIsChanged(value !== user.address);
         setNewAddress(value);
      }
   };

   const handleRestore = () => {
      setNewName(user.name);
      setNewEmail(user.email);
      setNewBio(user.bio);
      setNewPhone(user.bio);
      setNewAddress(user.bio);
      setIsChanged(false);
   };

   // ==============
   // DELETE PROFILE
   // ==============

   const closePopup = () => {
      setDeletePopup(false);
   };

   const deleteProfile = async (e) => {
      try {
         e.target.disabled = true;

         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         const res = await api.delete('/user/delete', config);
         const data = res.data;

         if (data.success) {
            toast.success(data.message);
            handleLogoutDeleteAcct();
         } else {
            toast.error(data.message);
            e.target.disabled = false;
         }
      } catch (err) {
         toast.error(err.response.data.message);
         e.target.disabled = false;
      }
   };

   const handleLogoutDeleteAcct = async () => {
      try {
         const params = true;
         logout(params);
      } catch (err) {
         console.error(err);
      }
   };

   const toggleActive = (button) => {
      setActiveBtn(button);
   };

   return (
      <>
         <div className="settings-page">
            <div className="settings-container">
               <AnimatedContainer>
                  <div className="">
                     <nav className="profile-nav">
                        <button
                           className={`my-data-btn btn ${activeBtn === 'my-data' ? 'active' : 'inactive'}`}
                           onClick={() => toggleActive('my-data')}
                        >
                           Personal Data
                        </button>
                        <button
                           className={`preferences-btn btn ${activeBtn === 'preferences' ? 'active' : 'inactive'}`}
                           onClick={() => toggleActive('preferences')}
                        >
                           Preferences
                        </button>
                        <button
                           className={`notifications-btn btn ${activeBtn === 'notifications' ? 'active' : 'inactive'}`}
                           onClick={() => toggleActive('notifications')}
                        >
                           Notifications
                        </button>
                        <button
                           className={`danger-zone-btn btn ${activeBtn === 'danger-zone' ? 'active' : 'inactive'}`}
                           onClick={() => toggleActive('danger-zone')}
                        >
                           Danger Zone
                        </button>
                     </nav>
                  </div>

                  {activeBtn === 'my-data' && (
                     <div className="my-data">
                        <div className="my-data-img">
                           <div className="my-data-banner-container">
                              <div className="my-data-banner"></div>
                              <div className="my-data-btns-2">
                                 <button className="secondary-btn my-data-save-btn btn">
                                    Change
                                 </button>
                                 <button className="secondary-btn-alt my-data-save-btn btn">
                                    Remove
                                 </button>
                              </div>
                           </div>
                           <div className="my-data-profile-picture-container">
                              <div className="my-data-profile-picture"></div>
                              <div className="my-data-btns-2">
                                 <button className="secondary-btn my-data-save-btn btn">
                                    Change
                                 </button>
                                 <button className="secondary-btn-alt my-data-save-btn btn">
                                    Remove
                                 </button>
                              </div>
                           </div>
                        </div>

                        <form className="settings-form form">
                           <div className="form">
                              <label htmlFor="name">Full Name:</label>
                              <input
                                 type="text"
                                 value={newName}
                                 onChange={handleChange}
                                 name="name"
                                 id="name"
                                 autoComplete="name"
                              />
                           </div>

                           <div className="form">
                              <label htmlFor="email">Email Address:</label>
                              <input
                                 type="email"
                                 value={newEmail}
                                 onChange={handleChange}
                                 name="email"
                                 id="email"
                                 autoComplete="email"
                              />
                           </div>

                           <div className="form">
                              <label htmlFor="phone">Phone number:</label>
                              <input
                                 type="text"
                                 value={newPhone}
                                 onChange={handleChange}
                                 name="phone"
                                 id="phone"
                                 autoComplete="phone"
                              />
                           </div>

                           <div className="form">
                              <label htmlFor="address">Address:</label>
                              <input
                                 type="text"
                                 value={newAddress}
                                 onChange={handleChange}
                                 name="address"
                                 id="address"
                                 autoComplete="address"
                              />
                           </div>

                           <div className="form">
                              <label htmlFor="bio">My Bio:</label>
                              <textarea
                                 type="text"
                                 value={newBio}
                                 onChange={handleChange}
                                 name="bio"
                                 id="bio"
                                 autoComplete="bio"
                                 rows="6"
                              ></textarea>
                           </div>
                        </form>
                        <div className="my-data-btns">
                           <button
                              className="secondary-btn-alt my-data-save-btn btn"
                              onClick={handleRestore}
                              disabled={!isChanged}
                           >
                              Restore Defaults
                           </button>
                           <button
                              className="secondary-btn my-data-save-btn btn"
                              onClick={updateProfile}
                              disabled={!isChanged}
                           >
                              Save Changes
                           </button>
                        </div>
                     </div>
                  )}

                  {activeBtn === 'preferences' && (
                     <div className="preferences">
                        <h3>IN PROGRESS</h3>
                        <p>Preferences</p>
                     </div>
                  )}

                  {activeBtn === 'notifications' && (
                     <div className="notifications">
                        <h3>IN PROGRESS</h3>
                        <p>Notifications</p>
                     </div>
                  )}

                  {activeBtn === 'danger-zone' && (
                     <div className="danger-zone">
                        <h3>DELETE MY ACCOUNT</h3>
                        <p>
                           By clicking the button down below, you will remove your account
                           permanently from our databases:
                        </p>
                        <br />
                        <div>
                           <button
                              className="btn remove-btn"
                              onClick={() => setDeletePopup(true)}
                           >
                              Delete account
                           </button>
                        </div>
                     </div>
                  )}

                  {deletePopup && (
                     <div className="popup" onClick={closePopup}>
                        <div
                           className="popup-content"
                           onClick={(e) => e.stopPropagation()}
                        >
                           <p className="confirmation">
                              Are you sure you want to proceed?
                           </p>
                           <button className="btn close-btn" onClick={closePopup}>
                              &#10006;
                           </button>
                           <button
                              className="btn secondary-btn"
                              onClick={(e) => {
                                 deleteProfile(e);
                              }}
                           >
                              Yes
                           </button>
                           <button className="btn remove-btn" onClick={closePopup}>
                              No
                           </button>
                        </div>
                     </div>
                  )}
               </AnimatedContainer>
            </div>
         </div>
      </>
   );
};

export default SettingsPage;
