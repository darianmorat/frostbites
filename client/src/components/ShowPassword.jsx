/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ShowPassword = ({ showPassword, setShowPassword }) => {
   const toggleShowPassword = () => {
      setShowPassword((prevState) => !prevState);
   };

   return (
      <>
         <button type="button" className="btn show-password" onClick={toggleShowPassword}>
            {showPassword ? (
               <FontAwesomeIcon icon="fa-solid fa-eye" className="icons-v2 show" />
            ) : (
               <FontAwesomeIcon icon="fa-solid fa-eye-slash" className="icons-v2 show" />
            )}
         </button>
      </>
   );
};
