import { AnimatedContainer } from '../../components/AnimatedContainer';
import who_we_are_img from '../../assets/images/who-we-are.jpeg';
import our_team_img from '../../assets/images/our-team.jpeg';
import '../public.css';

const AboutPage = () => {
   return (
      <div className="about">
         <AnimatedContainer>
            <section className="about-section-1">
               <div className="about-left">
                  <h2 className="about-title-small">Know more</h2>
                  <h1 className="about-title">Who we are?</h1>
                  <p className="about-description">
                     Frost Bites is a small but dedicated team of ice cream enthusiasts
                     from Colombia. We believe in the magic of ice cream and its power to
                     bring joy to people of all ages. Our mission is to craft the most
                     delightful and unique flavors, using the best ingredients, to ensure
                     every bite is a burst of happiness. We are also committed to helping
                     other ice cream businesses succeed by offering beautifully designed,
                     user-friendly websites that enhance their online presence. <br />
                     We are also committed to helping other ice cream businesses succeed
                     by offering beautifully designed, user-friendly websites that enhance
                     their online presence. Join us on our journey to spread the love of
                     ice cream and support local businesses in their quest for success.
                  </p>
               </div>

               <div className="about-right">
                  <img src={who_we_are_img} alt="Who are we" className="img" />
               </div>
            </section>

            <section className="about-section-2">
               <div className="about-right">
                  <img src={our_team_img} alt="Our team" className="img" />
               </div>

               <div className="about-left">
                  <h2 className="about-title-small">This is our</h2>
                  <h1 className="about-title">Team group</h1>
                  <p className="about-description">
                     Frost Bites is a small but dedicated team of ice cream enthusiasts
                     from Colombia. We believe in the magic of ice cream and its power to
                     bring joy to people of all ages. Our mission is to craft the most
                     delightful and unique flavors, using the best ingredients, to ensure
                     every bite is a burst of happiness. We are also committed to helping
                     other ice cream businesses succeed by offering beautifully designed,
                     user-friendly websites that enhance their online presence. <br />
                     We are also committed to helping other ice cream businesses succeed
                     by offering beautifully designed, user-friendly websites that enhance
                     their online presence. Join us on our journey to spread the love of
                     ice cream and support local businesses in their quest for success.
                  </p>
               </div>
            </section>
         </AnimatedContainer>
      </div>
   );
};

export default AboutPage;
