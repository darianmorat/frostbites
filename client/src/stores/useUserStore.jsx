import { create } from 'zustand';
import { toast } from 'react-toastify';
import { useCartStore } from './useCartStore';
import api from '../../api/axios';

export const useUserStore = create((set) => ({
   user: null,
   isAuth: false,
   isAdmin: false,
   loading: false,
   checkingAuth: true,

   verifyUser: async () => {
      // this is the registration lmao
      set({ loading: true });

      try {
         const token = window.location.pathname.split('/').pop();

         const res = await api.get(`/verify/send-email/${token}`);
         const data = res.data;

         if (data.token) {
            const dateString = data.user.created_at;
            const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
               year: 'numeric',
               month: 'long',
               day: 'numeric',
            });
            data.user.created_at = formattedDate;

            set({ user: data.user, isAuth: true, loading: false });
            localStorage.setItem('token', data.token);
            toast.success('Register successfull!');
         }
      } catch (err) {
         toast.error(err.response.data.message);
         set({ loading: false });
      }
   },

   getUser: async () => {
      const token = localStorage.getItem('token');

      if (!token) {
         return;
      }

      set({ loading: true });
      try {
         const config = {
            headers: { token: localStorage.token },
         };

         const res = await api.get('/user', config);
         const data = res.data;

         if (data.success) {
            const dateString = data.user.created_at;
            const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
               year: 'numeric',
               month: 'long',
               day: 'numeric',
            });
            data.user.created_at = formattedDate;

            set({ user: data.user });
            set({ loading: false });
         }
      } catch (err) {
         set({ loading: false });
         toast.error(err.response.data.message);
      }
   },

   updateUser: async (newName, newEmail, newBio) => {
      set({ loading: true });
      try {
         const body = {
            user_name: newName,
            user_email: newEmail,
            user_bio: newBio,
         };

         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         const res = await api.put('/user/update', body, config);
         const data = res.data;

         if (data.success) {
            const dateString = data.user.created_at;
            const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
               year: 'numeric',
               month: 'long',
               day: 'numeric',
            });
            data.user.created_at = formattedDate;

            toast.success(data.message);
            set({ user: data.user });
            set({ loading: false });
            return true;
         }
      } catch (err) {
         set({ loading: false });
         toast.error(err.response.data.message);
         return false;
      }
   },

   login: async (values) => {
      try {
         const res = await api.post('/auth/login', values);
         const data = res.data;

         if (data.success) {
            const dateString = data.user.created_at;
            const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
               year: 'numeric',
               month: 'long',
               day: 'numeric',
            });
            data.user.created_at = formattedDate;

            localStorage.setItem('token', data.token);
            set({ user: data.user, isAuth: true, isAdmin: data.isAdmin }); // not secure
            toast.success('Login successful!');
         }
      } catch (err) {
         toast.error(err.response.data.message);
         if (err.response.data.message === 'Email or Password is incorrect') {
            toast.dismiss('toast');
         }

         if (err.response.data.isVerified === false) {
            if (!toast.isActive('toast')) {
               toast.warning(
                  <>
                     <span>
                        Did not receive the email? <br />
                        <a href="/resend-email">Click here to resend</a>
                     </span>
                  </>,
                  {
                     toastId: 'toast',
                     autoClose: false,
                     closeOnClick: false,
                     draggable: false,
                     position: 'top-right',
                  },
               );
            }
         }
      }
   },

   signup: async () => {},

   logout: async (params) => {
      if (params) {
         localStorage.removeItem('token');
         set({ user: null, isAuth: false, isAdmin: false });
         return;
      }
      localStorage.removeItem('token');
      set({ user: null, isAuth: false, isAdmin: false });
      toast.info('Logout successful!');
   },

   checkAuth: async () => {
      const token = localStorage.getItem('token');

      if (!token) {
         set({ isAuth: false, isAdmin: false, checkingAuth: false });
         useCartStore.setState({ cart: [], total: 0 });
         return;
      }

      set({ checkingAuth: true });

      try {
         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         const res = await api.get('/auth/verify', config);
         const data = res.data;

         if (data.isAdmin) {
            set({ isAdmin: true });
            set({ checkingAuth: false });
         }

         if (data.success) {
            set({ isAuth: true });
            set({ checkingAuth: false });
         }
      } catch (err) {
         toast.error(err.response.data.message);
         set({ user: null, checkingAuth: false });
      }
   },
}));
