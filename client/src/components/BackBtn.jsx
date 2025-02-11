/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BackBtn = ({ path }) => {
   const navigate = useNavigate();

   return (
      <>
         {/* SEND BACK TO WHERE THE USER WAS, NOT TO THE HOME */}
         <button className="btn back-btn" onClick={() => navigate(path)}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="icons-v2 back" />
         </button>
      </>
   );
};
