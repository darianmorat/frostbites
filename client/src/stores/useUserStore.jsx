import { create } from 'zustand';
import { toast } from 'react-toastify';
import { useCartStore } from './useCartStore';
import api from '../../api/axios';

const formatCreatedAtDate = (dateString) => {
   return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   });
};

export const useUserStore = create((set, get) => ({
   user: null,
   purchases: null,

   isAuth: false,
   isAdmin: false,
   loading: false,
   checkingAuth: true,

   verifyUser: async () => {
      set({ loading: true });
      try {
         const token = window.location.pathname.split('/').pop();
         const res = await api.get(`/verify/send-email/${token}`);
         const data = res.data;

         if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = '/';
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
            const formattedDate = formatCreatedAtDate(dateString);
            data.user.created_at = formattedDate;

            set({ user: data.user, purchases: data.purchases, loading: false });
         }
      } catch (err) {
         set({ loading: false });
         toast.error(err.response.data.message);
      }
   },

   signup: async (values) => {
      set({ loading: true });
      try {
         if (values.auth_provider) {
            const res = await api.post('/auth/register-google', values);
            const data = res.data;

            if (data.success) {
               localStorage.setItem('token', data.token);
               window.location.href = '/';
               toast.success(data.message);
            }
         } else {
            const res = await api.post('/auth/register', values);
            const data = res.data;

            if (data.success) {
               localStorage.setItem('email', values.email);
               window.location.href = '/verify-email';
               set({ loading: false });
               // toast.info(data.message);
            }
         }
      } catch (err) {
         toast.error(err.response.data.message);
         set({ loading: false });

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

   login: async (values) => {
      try {
         if (values.auth_provider) {
            const res = await api.post('/auth/login-google', values);
            const data = res.data;

            if (data.success) {
               localStorage.setItem('token', data.token);
               set({
                  user: data.user,
                  purchases: data.purchases,
                  isAuth: true,
                  isAdmin: data.isAdmin,
               });
               toast.success(data.message);
            }
         } else {
            const res = await api.post('/auth/login', values);
            const data = res.data;

            if (data.success) {
               localStorage.setItem('token', data.token);
               set({
                  user: data.user,
                  purchases: data.purchases,
                  isAuth: true,
                  isAdmin: data.isAdmin,
               });
               toast.success(data.message);
            }
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

   updateUser: async (newName, newEmail, newBio, newPhone, newAddress) => {
      set({ loading: true });
      try {
         const body = {
            name: newName,
            email: newEmail,
            bio: newBio,
            phone: newPhone,
            address: newAddress,
         };

         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         const res = await api.put('/user/update', body, config);
         const data = res.data;

         if (data.success) {
            get().getUser();
            toast.success(data.message);
            set({ loading: false });
            return true;
         }
      } catch (err) {
         set({ loading: false });
         toast.error(err.response.data.message);
         return false;
      }
   },

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

         if (data.isAdmin) set({ isAdmin: true });
         if (data.success) set({ isAuth: true });

         set({ checkingAuth: false });
      } catch (err) {
         toast.error(err.response.data.message);
         set({ user: null, checkingAuth: false });
      }
   },
}));
