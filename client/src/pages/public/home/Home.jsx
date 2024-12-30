import { Link } from "react-router-dom"

import './home.css'
import about_img from '../../../assets/images/about-us.jpg'
import wave_svg from '../../../assets/images/svg/wave.svg'
import circle_svg from '../../../assets/images/svg/circle.svg'
import iceman_svg from '../../../assets/images/svg/iceman.svg'

export function Home(){
   return (
      <>
         <section className="hero-section">
            <div className="hero-container">
               <div className="hero-left">
                  <h2 className="hero-title-small">A NEW WAY TO IMAGE</h2>
                  <h1 className="hero-title">ICE CREAM</h1>
                  <button className="btn hero-btn-buy"> 
                     <Link to="/shop">BUY NOW</Link>
                  </button> 
               </div>

               <div className="hero-right">
                  <img src={circle_svg} alt="" className="circle-svg"/>
                  <img src={iceman_svg} alt="" className="iceman-svg"/>
               </div>
            </div>
         </section>
         {/* <button className="hero-btn-explore">EXPLORE MORE<br/> <i>↓</i></button> */}

         <img src={wave_svg} alt="" className="wave-svg"/>

         <section className="about-section">         
            <div className="about-left">
               <img src={about_img} alt="About us" className='about-img'/>
            </div>
            <div className="about-right">
               <h2 className="about-title-small">KNOW MORE</h2>
               <h1 className="about-title">ABOUT US</h1>
               <p className="about-description">
                  We are Frost Bites, a passionate team from Colombia dedicated to
                  bringing you the finest variety of ice creams.
                  Our mission is to create delicious and unique flavors that delight your
                  taste buds, using only the highest quality ingredients. We believe in
                  spreading joy through every scoop and are committed to innovation
                  and excellence in every aspect of our craft.
               </p>
               <button className="btn about-btn-more">
                  <Link to="/about">READ MORE</Link>
               </button>
            </div>
         </section>

         <section className="section-3">         
         </section>
         <div>
         </div>
      </>
   )
}
