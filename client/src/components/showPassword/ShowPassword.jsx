/* eslint-disable react/prop-types */

export const ShowPassword = ({ showPassword, setShowPassword }) => {
   const toggleShowPassword = () => {
      setShowPassword((prevState) => !prevState);
   };

   return (
      <>
         <button type="button" className="btn show-password" onClick={toggleShowPassword}>
            {showPassword ? (
               <i className="bx bx-show bx-sm" id="show-icon"></i>
            ) : (
               <i className="bx bx-hide bx-sm" id="show-icon"></i>
            )}
         </button>
      </>
   );
};
