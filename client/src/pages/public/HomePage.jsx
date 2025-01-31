import { useNavigate } from 'react-router-dom';
import { Location } from '../../components/Location';
import { AnimatedContainer } from '../../components/AnimatedContainer';
import about_img from '../../assets/images/about-us.jpeg';
import wave_svg from '../../assets/images/svg/wave.svg';
import circle_svg from '../../assets/images/svg/circle.svg';
import iceman_svg from '../../assets/images/svg/iceman.svg';
import with_love_svg from '../../assets/images/svg/with-love.svg';
import expression_svg from '../../assets/images/svg/expression.svg';
import image1 from '../../assets/images/gallery/g1.jpeg';
import image2 from '../../assets/images/gallery/g2.jpg';
import image3 from '../../assets/images/gallery/g3.jpeg';
import image4 from '../../assets/images/gallery/g4.jpg';
import image5 from '../../assets/images/gallery/g5.jpg';
import image6 from '../../assets/images/gallery/g6.jpeg';
import image7 from '../../assets/images/gallery/g7.jpeg';
import image8 from '../../assets/images/gallery/g8.jpeg';
import image9 from '../../assets/images/gallery/g9.jpg';
import '../public.css';

const HomePage = () => {
   const navigate = useNavigate();

   return (
      <>
         <section className="hero-section">
            <div className="hero-container">
               <div className="hero-left">
                  <AnimatedContainer>
                     <h2 className="hero-title-small">A new way to image</h2>
                     <h1 className="hero-title">ICE CREAM</h1>
                     <button
                        className="btn add-to-cart"
                        onClick={() => navigate('/shopping')}
                     >
                        Explore Shop
                     </button>
                  </AnimatedContainer>
               </div>

               <div className="hero-right">
                  <AnimatedContainer
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                     <img src={circle_svg} alt="" className="circle-svg" />
                     <img src={iceman_svg} alt="" className="iceman-svg" />
                  </AnimatedContainer>
               </div>
            </div>
         </section>

         <img src={wave_svg} alt="" className="wave-left-svg" />
         <img src={wave_svg} alt="" className="wave-right-svg" />
         <img src={wave_svg} alt="" className="wave-left-svg base" />
         <img src={wave_svg} alt="" className="wave-right-svg base" />

         <section className="about-section">
            <div className="about-container">
               <div className="about-left">
                  <img src={about_img} alt="About us" className="img" />
               </div>

               <div className="about-right">
                  <h2 className="about-title-small">Know more</h2>
                  <h1 className="about-title">About us</h1>
                  <p className="about-description">
                     We are Frost Bites, a passionate team from Colombia dedicated to
                     bringing you the finest variety of ice creams. Our mission is to
                     create delicious and unique flavors that delight your taste buds,
                     using only the highest quality ingredients. We believe in spreading
                     joy through every scoop and are committed to innovation and
                     excellence in every aspect of our craft.
                  </p>
                  <button
                     className="btn add-to-cart check-more-btn"
                     onClick={() => navigate('/about-us')}
                  >
                     Check More
                  </button>
               </div>
            </div>
         </section>

         <div className="marquee-container">
            <p className="marquee marquee1">
               <span>
                  LOVE & ICE CREAM - LOVE & ICE CREAM - LOVE & ICE CREAM - LOVE & ICE
                  CREAM - LOVE & ICE CREAM -&nbsp;
               </span>
            </p>
            <p className="marquee marquee2">
               <span>
                  LOVE & ICE CREAM - LOVE & ICE CREAM - LOVE & ICE CREAM - LOVE & ICE
                  CREAM - LOVE & ICE CREAM -&nbsp;
               </span>
            </p>
         </div>

         <section className="section-3">
            <div className="gallery">
               {/* CHANGE WITH THE REAL IMAGES */}
               <img src={image1} alt="" className="gallery-img img-1" />
               <img src={image3} alt="" className="gallery-img img-2" />
               <img src={image2} alt="" className="gallery-img img-3" />

               <img src={image4} alt="" className="gallery-img img-4" />
               <img src={image5} alt="" className="gallery-img img-5" />
               <img src={image6} alt="" className="gallery-img img-6" />

               <img src={image7} alt="" className="gallery-img img-7" />
               <img src={image8} alt="" className="gallery-img img-8" />
               <img src={image9} alt="" className="gallery-img img-9" />
            </div>

            <div className="gallery-svg-container">
               <img src={expression_svg} alt="" className="expression-svg" />
               <img src={with_love_svg} alt="" className="with-love-svg" />
            </div>
         </section>
         <Location />
      </>
   );
};

export default HomePage;
