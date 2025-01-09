import { useEffect, useState } from "react";
import './admin.css'

export const Admin = () => {  

   const [users, setUsers] = useState([]);

   const adminStats = async() => {
      try {
         const res = await fetch('http://localhost:3000/admin', {
            method: "GET" 
         });

         const parseData = await res.json();
         setUsers(parseData.countUsers.count);

      } catch (err) {
         console.error(err);
      }
   }

   useEffect(() => {
      adminStats()
   }, [])

   return (
      <div className="admin-page">
         <h1>Admin page</h1>

         <h3>Website views</h3>
         <p>0</p>

         <h3>Users registered:</h3>
         <p>{users}</p>

         <h3>Total sales:</h3>
         <p>0</p>
      </div>
   );
};

