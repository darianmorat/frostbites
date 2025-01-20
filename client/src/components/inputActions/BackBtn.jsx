import { Link, useNavigate } from 'react-router-dom';
import 'boxicons';

export const BackBtn = () => {
   const navigate = useNavigate()

   return (
      <>
         {/* SEND BACK TO WHERE THE USER WAS, NOT TO THE HOME */}
         <div className="back-btn">
            <Link onClick={() => navigate(-1)}>
               <i className="bx bx-arrow-back bx-sm" id="back-icon"></i>
            </Link>
         </div>
      </>
   );
};
