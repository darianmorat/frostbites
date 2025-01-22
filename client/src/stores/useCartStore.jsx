import { create } from 'zustand';
import api from '../../api/axios';
import { toast } from 'react-toastify';

export const useCartStore = create((set) => ({
   cart: [],
   cartCount: 0,
   total: 0,

   fetchCart: async () => {
      const token = localStorage.getItem('token');

      if (!token) {
         return;
      }

      try {
         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         const res = await api.get('/cart', config);
         const data = res.data;

         if (data.success) {
            set(() => ({
               cart: data.order,
               cartCount: data.order.length,
               total: data.order
                  .reduce((sum, item) => sum + item.product_price * item.quantity, 0)
                  .toFixed(2),
            }));
         }
      } catch (err) {
         console.error(err);
         toast.error(err.response);
      }
   },
   addToCart: async (productId) => {
      const token = localStorage.getItem('token');

      if (!token) {
         toast.info('Please login to proceed!');
         return;
      }

      try {
         const body = { productId };

         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         await api.post('/cart/add', body, config);
         await useCartStore.getState().fetchCart();
      } catch (err) {
         toast.error(err.response.data.message);
      }
   },
   removeFromCart: async (productId) => {
      const token = localStorage.getItem('token');

      if (!token) {
         toast.info('Please login to proceed!');
         return;
      }

      const cart = useCartStore.getState().cart;
      const cartItem = cart.find((item) => item.product_id === productId);

      if (!cartItem) {
         return;
      }

      try {
         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         await api.delete(`/cart/delete/${productId}`, config);
         await useCartStore.getState().fetchCart();
      } catch (err) {
         toast.error(err.response.data.message);
      }
   },
}));
