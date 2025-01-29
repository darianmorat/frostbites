import { Link } from 'react-router-dom';
import page_not_found from '../../assets/images/svg/page-not-found.svg';
import wave_svg from '../../assets/images/svg/wave.svg';
import '../public.css';

const NotFoundPage = () => {
   return (
      <div className="page-not-found">
         <img src={page_not_found} alt="" className="page-not-found-img" />

         <img src={wave_svg} alt="" className="wave-left-svg" />
         <img src={wave_svg} alt="" className="wave-right-svg" />
         <img src={wave_svg} alt="" className="wave-left-svg base" />
         <img src={wave_svg} alt="" className="wave-right-svg base" />

         <p className="not-found-description">Oops, Page Not Found.</p>
         <div className="link">
            <Link to="/">Go to homepage</Link>
         </div>
      </div>
   );
};

export default NotFoundPage;
