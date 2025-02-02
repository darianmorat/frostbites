import { useUserStore } from '../../stores/useUserStore';
import { AnimatedContainer } from '../../components/AnimatedContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../private.css';

const ProfilePage = () => {
   const { user } = useUserStore();

   return (
      <>
         <div className="profile-page">
            <div className="profile-container">
               <AnimatedContainer>
                  <div className="profile-banner">
                     <div className="profile-info-container">
                        <div className="profile-picture"></div>
                        <div className="">
                           <p className="profile-name">{user.user_name}</p>
                           <p className="profile-country">Colombia</p>
                        </div>
                     </div>
                     <div className="profile-stats">
                        <div className="">
                           <p className="stats-number">07</p>
                           <p className="">Purchases</p>
                        </div>
                        <div className="">
                           <p className="stats-number">04</p>
                           <p className="">Beta level</p>
                        </div>
                        <div className="">
                           <p className="stats-number">01</p>
                           <p className="">Ranking</p>
                        </div>
                     </div>
                  </div>
                  <div className="">
                     {user ? (
                        <div className="profile-data-container">
                           <div className="my-data profile-data">
                              <div className="profile-bio">
                                 <h3>My bio:</h3>
                                 <p>{user.user_bio}</p>
                              </div>
                              <br />
                              <div className="profile-links">
                                 <h3>Links:</h3>
                                 <a href="#">https://www.instagram.com/darianmorat</a>
                                 <a href="#">https://github.com/darianmorat/frostbites</a>
                                 <a href="#">https://www.linkedin.com/in/darianmorat</a>
                              </div>
                              <br />
                              <div className="profile-contact-info">
                                 <h3>Contact Information:</h3>
                                 <div className="contact-profile-email">
                                    <FontAwesomeIcon
                                       icon="fa-solid fa-envelope"
                                       className="icons-v2"
                                    />
                                    <p>{user.user_email}</p>
                                 </div>

                                 <div className="contact-profile-phone">
                                    <FontAwesomeIcon
                                       icon="fa-solid fa-phone-volume"
                                       className="icons-v2"
                                    />
                                    <p>+57 322-393-9238</p>
                                 </div>

                                 <div className="contact-profile-country">
                                    <FontAwesomeIcon
                                       icon="fa-solid fa-location-dot"
                                       className="icons-v2"
                                    />
                                    <p>Neiva-Huila, Colombia, CL 24c #3W-04</p>
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
