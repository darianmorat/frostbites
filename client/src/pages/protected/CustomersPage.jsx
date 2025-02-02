import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../api/axios';
import { AnimatedContainer } from '../../components/AnimatedContainer';
import '../protected.css';

const CustomersPage = () => {
   const [totalUsers, setTotalUsers] = useState({});
   const [verifiedUsers, setVerifiedUsers] = useState([]);
   const [unverifiedUsers, setUnverifiedUsers] = useState([]);

   const [totalProducts, setTotalProducts] = useState([]);
   const [totalSales, setTotalSales] = useState([]);
   // const [totalRevenue, setTotalRevenue] = useState([]);

   const [showMore, setShowMore] = useState('total-users');

   const getStats = async () => {
      try {
         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         const res = await api.get('/admin/stats', config);
         const data = res.data;

         if (data.success) {
            setTotalUsers({ info: data.totalUsers, count: data.totalUsers.length });
            setVerifiedUsers(
               data.totalUsers.filter((user) => user.is_verified === true).length,
            );
            setUnverifiedUsers(
               data.totalUsers.filter((user) => user.is_verified === false).length,
            );

            const totalSales = data.totalSales;
            const totalSum = totalSales
               .reduce((acc, item) => acc + parseFloat(item.amount), 0)
               .toFixed(2);
            setTotalProducts(data.totalProducts.length);
            setTotalSales(totalSum);
         }
      } catch (err) {
         toast.info(err.response.data.message);
      }
   };

   useEffect(() => {
      getStats();
   }, []);

   return (
      <div className="customers-page">
         <div className="admin">
            <AnimatedContainer>
               <div className="admin-title">
                  <h2>Control panel</h2>
                  <h1>Customers</h1>
               </div>
               <div className="admin-stats-container">
                  <div
                     className={`admin-stats first ${showMore === 'total-users' && 'active'}`}
                  >
                     <div className="admin-stats-left">
                        <p className="admin-stats-number">
                           {/* should exclude admins registrations */}
                           {totalUsers.count
                              ? String(totalUsers.count).padStart(2, '0')
                              : '00'}
                        </p>
                        <h3 className="admin-stats-description">Total users</h3>
                     </div>
                     <button
                        className="btn admin-stats-right first"
                        onClick={() => setShowMore('total-users')}
                     >
                        More info
                        <i
                           className="bx bx-right-arrow-circle bx-sm"
                           id="show-more-icon"
                        ></i>
                     </button>
                  </div>

                  <div
                     className={`admin-stats first ${showMore === 'total-verified' && 'active'}`}
                  >
                     <div className="admin-stats-left">
                        <p className="admin-stats-number">
                           {/* should exclude admins registrations */}
                           {verifiedUsers ? String(verifiedUsers).padStart(2, '0') : '00'}
                        </p>
                        <h3 className="admin-stats-description">Total verified users</h3>
                     </div>
                     <button
                        className="btn admin-stats-right first"
                        onClick={() => setShowMore('total-verified')}
                     >
                        More info
                        <i
                           className="bx bx-right-arrow-circle bx-sm"
                           id="show-more-icon"
                        ></i>
                     </button>
                  </div>

                  <div
                     className={`admin-stats first ${showMore === 'total-unverified' && 'active'}`}
                  >
                     <div className="admin-stats-left">
                        <p className="admin-stats-number">
                           {/* should exclude admins registrations */}
                           {unverifiedUsers
                              ? String(unverifiedUsers).padStart(2, '0')
                              : '00'}
                        </p>
                        <h3 className="admin-stats-description">
                           Total unverified users
                        </h3>
                     </div>

                     <button
                        className="btn admin-stats-right first"
                        onClick={() => setShowMore('total-unverified')}
                     >
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
                           {totalProducts ? String(totalProducts).padStart(2, '0') : '00'}
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
                        <p className="admin-stats-number">${totalSales}</p>
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
                        <p className="admin-stats-number">${totalSales}</p>
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
               </div>
            </AnimatedContainer>

            {showMore === 'total-users' && (
               <>
                  <h2>TOTAL USERS</h2>
                  {totalUsers.info && totalUsers.count > 0 ? (
                     <table className="user-table">
                        <thead>
                           <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Created</th>
                              <th>Verified</th>
                           </tr>
                        </thead>
                        <tbody>
                           {totalUsers.info.map((user, index) => {
                              const formattedDate = new Date(
                                 user.created_at,
                              ).toLocaleDateString('en-US', {
                                 year: 'numeric',
                                 month: 'short',
                                 day: 'numeric',
                              });

                              return (
                                 <tr key={user.user_id}>
                                    <td>{index + 1}</td>
                                    <td>{user.user_name}</td>
                                    <td>{user.user_email}</td>
                                    <td>{formattedDate}</td>
                                    <td>
                                       {user.is_verified ? 'Verified' : 'Not Verified'}
                                    </td>
                                 </tr>
                              );
                           })}
                        </tbody>
                     </table>
                  ) : (
                     <p>No users found.</p>
                  )}
               </>
            )}
            {showMore === 'total-verified' && <>TOTAL VERIFIED</>}
            {showMore === 'total-unverified' && <>TOTAL UNVERIFIED</>}
         </div>
      </div>
   );
};

export default CustomersPage;
