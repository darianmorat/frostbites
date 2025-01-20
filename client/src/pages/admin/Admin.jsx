import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import './admin.css';
import { toast } from 'react-toastify';

export const Admin = () => {
   const [users, setUsers] = useState([]);

   const adminStats = async () => {
      try {
         const res = await api.get('/admin');
         const data = res.data;

         setUsers(data.countUsers.count);
      } catch (err) {
         toast.info(err.response.data.message)
      }
   };

   useEffect(() => {
      adminStats();
   }, []);

   return (
      <div className="admin">
         <div className="admin-title">
            <h2>Control panel</h2>
            <h1>Dashboard</h1>
         </div>

         <div className="admin-stats-container">
            <div className="admin-stats">
               <p className="admin-stats-number">
                  {users ? String(users).padStart(2, '0') : '00'}
               </p>
               <h3 className="admin-stats-description">Registered users</h3>
            </div>

            <div className="admin-stats">
               <p className="admin-stats-number">--</p>
               <h3 className="admin-stats-description">Total sales</h3>
            </div>

            <div className="admin-stats">
               <p className="admin-stats-number">--</p>
               <h3 className="admin-stats-description">Website views</h3>
            </div>

            <div className="admin-stats">
               <p className="admin-stats-number">--</p>
               <h3 className="admin-stats-description">Another value</h3>
            </div>
         </div>
      </div>
   );
};
