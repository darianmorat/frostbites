import { useNavigate } from 'react-router-dom';

import './home.css';
import about_img from '../../../assets/images/about-us.jpg';
import wave_svg from '../../../assets/images/svg/wave.svg';
import circle_svg from '../../../assets/images/svg/circle.svg';
import iceman_svg from '../../../assets/images/svg/iceman.svg';
import with_love_svg from '../../../assets/images/svg/with-love.svg';
import expression_svg from '../../../assets/images/svg/expression.svg';

import image1 from '../../../assets/images/gallery/g1.jpeg';
import image2 from '../../../assets/images/gallery/g2.jpg';
import image3 from '../../../assets/images/gallery/g3.jpeg';
import image4 from '../../../assets/images/gallery/g4.jpg';
import image5 from '../../../assets/images/gallery/g5.jpg';
import image6 from '../../../assets/images/gallery/g6.jpeg';
import image7 from '../../../assets/images/gallery/g7.jpeg';
import image8 from '../../../assets/images/gallery/g8.jpeg';
import image9 from '../../../assets/images/gallery/g9.jpg';

import { motion } from 'motion/react';

export function Home() {
   const navigate = useNavigate();

   return (
      <>
         <section className="hero-section">
            <div className="hero-container">
               <div className="hero-left">
                  <motion.div
                     initial={{ opacity: 0, x: -100 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: 100 }}
                     transition={{ duration: 0.7 }}
                  >
                     <h2 className="hero-title-small">A NEW WAY TO IMAGE</h2>
                     <h1 className="hero-title">ICE CREAM</h1>
                     <button
                        className="btn primary-btn hero-btn"
                        onClick={() => navigate('/shop')}
                     >
                        BUY NOW
                     </button>
                  </motion.div>
               </div>

               <div className="hero-right">
                  <motion.div
                     initial={{ opacity: 0, x: -100 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: 100 }}
                     transition={{ duration: 0.7 }}
                  >
                     <img src={circle_svg} alt="" className="circle-svg" />
                     <img src={iceman_svg} alt="" className="iceman-svg" />
                  </motion.div>
               </div>
            </div>
         </section>
         {/* <button className="hero-btn-explore">EXPLORE MORE<br/> <i>↓</i></button> */}

         <img src={wave_svg} alt="" className="wave-svg" />

         <section className="about-section">
            <motion.div
               initial={{ opacity: 0, x: -100 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 100 }}
               transition={{ duration: 0.7 }}
            >
               <div className="about-left">
                  <div
                     className="who-we-are-img img"
                     style={{
                        backgroundImage: `url(${about_img})`,
                        width: '600px',
                        height: '400px',
                        color: 'blue',
                     }}
                  ></div>
               </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: -100 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 100 }}
               transition={{ duration: 0.7 }}
            >
               <div className="about-right">
                  <h2 className="about-title-small">KNOW MORE</h2>
                  <h1 className="about-title">ABOUT US</h1>
                  <p className="about-description">
                     We are Frost Bites, a passionate team from Colombia dedicated to
                     bringing you the finest variety of ice creams. Our mission is to
                     create delicious and unique flavors that delight your taste buds,
                     using only the highest quality ingredients. We believe in spreading
                     joy through every scoop and are committed to innovation and
                     excellence in every aspect of our craft.
                  </p>
                  <button
                     className="btn primary-btn primary-btn-alt about-btn"
                     onClick={() => navigate('/about')}
                  >
                     READ MORE
                  </button>
               </div>
            </motion.div>
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
         <div></div>
      </>
   );
}
