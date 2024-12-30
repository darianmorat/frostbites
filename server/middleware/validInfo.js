export default (req, res, next) => {
   const { email, name, password } = req.body;

   function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
   }

   if (req.path === "/register") {
      if (![email, name, password].every(Boolean)) {
         return res.json({ message: 'Missing credentials'})
      } else if (!validEmail(email)) {
         return res.json({ message: 'Invalid email'})
      }
   } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
         return res.json({ message: 'Missing credentials'})
      } else if (!validEmail(email)) { // is a login, why checking if is valid?
         return res.json({ message: 'Invalid email'})
      }
   }

   next();
};
