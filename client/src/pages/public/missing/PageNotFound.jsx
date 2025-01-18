import { Link } from 'react-router-dom';
import page_not_found from '../../../assets/images/svg/page-not-found.svg';
import './PageNotFound.css';

export function PageNotFound() {
   return (
      <div className="missing-page">
         <img src={page_not_found} alt="" className="page-not-found" />
         <p>Oops, Page Not Found</p>
         <div className="link">
            <Link to="/">Visit Our Homepage</Link>
         </div>
      </div>
   );
}
