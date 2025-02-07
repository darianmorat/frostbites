import { create } from 'zustand';
import { toast } from 'react-toastify';
import api from '../../api/axios';

export const useCartStore = create((set, get) => ({
   cart: [],
   total: 0,

   fetchCart: async () => {
      const token = localStorage.getItem('token');

      if (!token) {
         set({ cart: [], total: 0 });
         return;
      }

      try {
         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         const res = await api.get('/cart', config);

         if (res.data.success) {
            set({ cart: res.data.cartItems });
            get().calculateTotals();
         }
      } catch (err) {
         toast.error(err.response.data.message);
      }
   },

   addToCart: async (product) => {
      const token = localStorage.getItem('token');

      if (!token) {
         toast.info('Login to add products to cart!');
         return;
      }

      try {
         const body = { productId: product.id };

         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         const res = await api.post('/cart/add', body, config);

         if (res.data.success) {
            toast.success(res.data.message);
            set((prevState) => {
               const existingItem = prevState.cart.find(
                  (item) => item.product_id === product.id,
               );
               const mappedProduct = {
                  product_id: product.id,
                  product_url: product.url,
                  product_name: product.name,
                  product_price: product.price,
               };
               const newCart = existingItem
                  ? prevState.cart.map((item) =>
                       item.product_id === product.id
                          ? { ...item, quantity: item.quantity + 1 }
                          : item,
                    )
                  : [...prevState.cart, { ...mappedProduct, quantity: 1 }];
               return { cart: newCart };
            });
            get().calculateTotals();
         }
      } catch (err) {
         toast.error(err.response.data.message);
      }
   },

   removeFromCart: async (productId) => {
      try {
         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         const res = await api.delete(`/cart/delete/${productId}`, config);

         if (res.data.success) {
            toast.info(res.data.message);
            set((prevState) => ({
               cart: prevState.cart.filter((item) => item.product_id !== productId),
            }));
            get().calculateTotals();
         }
      } catch (err) {
         toast.error(err.response.data.message);
      }
   },

   updateQuantity: async (productId, quantity) => {
      if (quantity === 0) {
         get().removeFromCart(productId);
         return;
      }

      try {
         const body = { productId, quantity };

         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         const res = await api.put('/cart/update', body, config);

         if (res.data.success) {
            set((prevState) => ({
               cart: prevState.cart.map((item) =>
                  item.product_id === productId ? { ...item, quantity } : item,
               ),
            }));
            get().calculateTotals();
         }
      } catch (err) {
         toast.error(err.response.data.message);
      }
   },

   clearCart: async (params) => {
      try {
         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         const res = await api.delete('/cart/delete', config);

         if (res.data.success) {
            if (params) {
               set({ cart: [], total: 0 });
               return;
            } else {
               toast.info(res.data.message);
               set({ cart: [], total: 0 });
            }
         }
      } catch (err) {
         toast.error(err.response.data.message);
      }
   },

   calculateTotals: () => {
      const { cart } = get();
      const total = cart
         .reduce((sum, item) => sum + item.product_price * item.quantity, 0)
         .toFixed(2);

      set({ total });
   },
}));
