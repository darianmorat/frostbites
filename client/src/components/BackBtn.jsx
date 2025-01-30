import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BackBtn = () => {
   const navigate = useNavigate();

   return (
      <>
         {/* SEND BACK TO WHERE THE USER WAS, NOT TO THE HOME */}
         <div className="back-btn">
            <Link onClick={() => navigate(-1)}>
               <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="icons-v2 back" />
            </Link>
         </div>
      </>
   );
};
