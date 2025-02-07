import { useUserStore } from '../../stores/useUserStore';
import { AnimatedContainer } from '../../components/AnimatedContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../private.css';
import { useEffect } from 'react';

const ProfilePage = () => {
   const { user, purchases, getUser, isAdmin } = useUserStore();
   const totalPurchases = purchases > 0 ? String(purchases).padStart(2, '0') : '00';

   useEffect(() => {
      getUser();
   }, []);

   return (
      <>
         <div className="profile-page">
            <div className="profile-container">
               <AnimatedContainer>
                  <div className="profile-banner">
                     <div className="profile-info-container">
                        <div className="profile-picture"></div>
                        <div className="">
                           <p className="profile-name">{user.name}</p>
                           <p className="profile-country">xxxx</p>
                        </div>
                     </div>
                     {!isAdmin && (
                        <div className="profile-stats">
                           <div className="">
                              <p className="stats-number">{totalPurchases}</p>
                              <p className="">Purchases</p>
                           </div>
                        </div>
                     )}
                  </div>
                  <div className="">
                     {user ? (
                        <div className="profile-data-container">
                           <div className="my-data profile-data">
                              <div className="profile-bio">
                                 <h3>My bio:</h3>
                                 <p>{user.bio}</p>
                              </div>
                              <br />
                              <div className="profile-links">
                                 <h3>Links:</h3>
                                 <a href="#">https://www.example-page.com</a>
                                 <a href="#">https://www.example-page.com</a>
                                 <a href="#">https://www.example-page.com</a>
                              </div>
                              <br />
                              <div className="profile-contact-info">
                                 <h3>Contact Information:</h3>
                                 <div className="contact-profile-email">
                                    <FontAwesomeIcon
                                       icon="fa-solid fa-envelope"
                                       className="icons-v2"
                                    />
                                    <p>{user.email}</p>
                                 </div>

                                 <div className="contact-profile-phone">
                                    <FontAwesomeIcon
                                       icon="fa-solid fa-phone-volume"
                                       className="icons-v2"
                                    />
                                    <p>{user.phone}</p>
                                 </div>

                                 <div className="contact-profile-address">
                                    <FontAwesomeIcon
                                       icon="fa-solid fa-location-dot"
                                       className="icons-v2 address-icon"
                                    />
                                    <p>{user.address}</p>
                                 </div>
                              </div>
                              <br />
                              <div className="contact-profile-data-joined">
                                 <h3>Customer since:</h3>
                                 <p>{user.created_at}</p>
                              </div>
                           </div>
                        </div>
                     ) : (
                        <div className="loading">Loading user data...</div>
                     )}
                  </div>
               </AnimatedContainer>
            </div>
         </div>
      </>
   );
};

export default ProfilePage;
