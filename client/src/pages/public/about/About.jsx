import who_we_are_img from '../../../assets/images/who-we-are.jpeg';
import our_team_img from '../../../assets/images/our-team.jpeg';
import './about.css';
import { motion } from 'motion/react';

export function About() {
   return (
      <motion.div
         initial={{ opacity: 0, x: -100 }}
         animate={{ opacity: 1, x: 0 }}
         exit={{ opacity: 0, x: 100 }}
         transition={{ duration: 0.7 }}
      >
         <div className="about">
            <section className="about-section-1">
               <div className="about-left">
                  <h2 className="about-title-small">KNOW MORE</h2>
                  <h1 className="about-title">WHO WE ARE?</h1>
                  <p className="about-description">
                     Frost Bites is a small but dedicated team of ice cream enthusiasts
                     from Colombia. We believe in the magic of ice cream and its power to
                     bring joy to people of all ages. Our mission is to craft the most
                     delightful and unique flavors, using the best ingredients, to ensure
                     every bite is a burst of happiness.
                     <br />
                     We are also committed to helping other ice cream businesses succeed
                     by offering beautifully designed, user-friendly websites that enhance
                     their online presence. Join us on our journey to spread the love of
                     ice cream and support local businesses in their quest for success.
                  </p>
               </div>

               <div className="about-right">
                  <div
                     className="who-we-are-img img"
                     style={{
                        backgroundImage: `url(${who_we_are_img})`,
                        width: '600px',
                        height: '400px',
                        color: 'blue',
                     }}
                  ></div>
               </div>
            </section>

            <section className="about-section-2">
               <div className="about-right">
                  <div
                     className="our-team-img img"
                     style={{
                        backgroundImage: `url(${our_team_img})`,
                        width: '600px',
                        height: '400px',
                        color: 'blue',
                     }}
                  ></div>
               </div>

               <div className="about-left">
                  <h2 className="about-title-small">THIS IS OUR</h2>
                  <h1 className="about-title">TEAM GROUP</h1>
                  <p className="about-description">
                     Frost Bites is a small but dedicated team of ice cream enthusiasts
                     from Colombia. We believe in the magic of ice cream and its power to
                     bring joy to people of all ages. Our mission is to craft the most
                     delightful and unique flavors, using the best ingredients, to ensure
                     every bite is a burst of happiness.
                     <br />
                     We are also committed to helping other ice cream businesses succeed
                     by offering beautifully designed, user-friendly websites that enhance
                     their online presence. Join us on our journey to spread the love of
                     ice cream and support local businesses in their quest for success.
                  </p>
               </div>
            </section>
         </div>
      </motion.div>
   );
}
