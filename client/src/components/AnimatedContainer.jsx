/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

export const AnimatedContainer = ({ children, initial, animate, exit, transition }) => {
   return (
      <motion.div
         initial={initial || { opacity: 0, y: 10 }}
         animate={animate || { opacity: 1, y: 0 }}
         exit={exit || { opacity: 0, y: 10 }}
         transition={transition || { duration: 0.3, ease: 'easeInOut' }}
      >
         {children}
      </motion.div>
   );
};
