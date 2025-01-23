import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../api/axios';
import 'boxicons';

import { AnimatedContainer } from '../../components/animations/AnimatedContainer';
import './admin.css';

export const Admin = () => {
   const [users, setUsers] = useState([]);
   const [verifiedUsers, setVerifiedUsers] = useState([]);
   const [unverifiedUsers, setUnverifiedUsers] = useState([]);
   const [products, setProducts] = useState([]);

   const adminStats = async () => {
      try {
         const res = await api.get('/admin');
         const data = res.data;

         if (data.success) {
            // Counters
            setUsers(data.totalUsers.count);
            setVerifiedUsers(data.totalVerifiedUsers.count);
            setUnverifiedUsers(data.totalUnverifiedUsers.count);
            setProducts(data.totalProducts.count);

            // Data
            console.log(data.verifiedEmails); // show them in more info
            console.log(data.unverifiedEmails); // show them in more info
         }
      } catch (err) {
         toast.info(err.response.data.message);
      }
   };

   useEffect(() => {
      adminStats();
   }, []);

   return (
      <div className="admin">
         <AnimatedContainer>
            <div className="admin-title">
               <h2>Control panel</h2>
               <h1>Dashboard</h1>
            </div>

            <div className="admin-stats-container">
               <div className="admin-stats first">
                  <div className="admin-stats-left">
                     <p className="admin-stats-number">
                        {/* should exclude admins registrations */}
                        {users ? String(users).padStart(2, '0') : '00'}
                     </p>
                     <h3 className="admin-stats-description">Total users</h3>
                  </div>
                  <button className="btn admin-stats-right first">
                     More info
                     <i
                        className="bx bx-right-arrow-circle bx-sm"
                        id="show-more-icon"
                     ></i>
                  </button>
               </div>

               <div className="admin-stats first">
                  <div className="admin-stats-left">
                     <p className="admin-stats-number">
                        {/* should exclude admins registrations */}
                        {verifiedUsers ? String(verifiedUsers).padStart(2, '0') : '00'}
                     </p>
                     <h3 className="admin-stats-description">Total verified users</h3>
                  </div>
                  <button className="btn admin-stats-right first">
                     More info
                     <i
                        className="bx bx-right-arrow-circle bx-sm"
                        id="show-more-icon"
                     ></i>
                  </button>
               </div>

               <div className="admin-stats first">
                  <div className="admin-stats-left">
                     <p className="admin-stats-number">
                        {/* should exclude admins registrations */}
                        {unverifiedUsers
                           ? String(unverifiedUsers).padStart(2, '0')
                           : '00'}
                     </p>
                     <h3 className="admin-stats-description">Total unverified users</h3>
                  </div>

                  <button className="btn admin-stats-right first">
                     More info
                     <i
                        className="bx bx-right-arrow-circle bx-sm"
                        id="show-more-icon"
                     ></i>
                  </button>
               </div>

               <div className="admin-stats second">
                  <div className="admin-stats-left">
                     <p className="admin-stats-number">
                        {products ? String(products).padStart(2, '0') : '00'}
                     </p>
                     <h3 className="admin-stats-description">Total products</h3>
                  </div>

                  <button className="btn admin-stats-right second">
                     More info
                     <i
                        className="bx bx-right-arrow-circle bx-sm"
                        id="show-more-icon"
                     ></i>
                  </button>
               </div>

               <div className="admin-stats second">
                  <div className="admin-stats-left">
                     <p className="admin-stats-number">--</p>
                     <h3 className="admin-stats-description">Total sales</h3>
                  </div>

                  <button className="btn admin-stats-right second">
                     More info
                     <i
                        className="bx bx-right-arrow-circle bx-sm"
                        id="show-more-icon"
                     ></i>
                  </button>
               </div>

               <div className="admin-stats second">
                  <div className="admin-stats-left">
                     <p className="admin-stats-number">--</p>
                     <h3 className="admin-stats-description">Total revenue</h3>
                  </div>

                  <button className="btn admin-stats-right second">
                     More info
                     <i
                        className="bx bx-right-arrow-circle bx-sm"
                        id="show-more-icon"
                     ></i>
                  </button>
               </div>

               {/* grafic for this instead of box? */}
               <div className="admin-stats third">
                  <div className="admin-stats-left">
                     <p className="admin-stats-number">--</p>
                     <h3 className="admin-stats-description">Website views</h3>
                  </div>

                  <button className="btn admin-stats-right third">
                     More info
                     <i
                        className="bx bx-right-arrow-circle bx-sm"
                        id="show-more-icon"
                     ></i>
                  </button>
               </div>
            </div>
         </AnimatedContainer>
      </div>
   );
};
