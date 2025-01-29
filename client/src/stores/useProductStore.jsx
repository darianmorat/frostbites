import { create } from 'zustand';
import api from '../../api/axios';
import { toast } from 'react-toastify';

export const useProductStore = create((set) => ({
   products: [],

   fetchProducts: async () => {
      try {
         const res = await api.get('/product');
         const data = res.data;

         if (data.success) {
            set({ products: data.products });
         }
      } catch (err) {
         toast.error(err.response.data.message);
      }
   },

   createProduct: async (values) => {
      try {
         const config = {
            headers: {
               token: localStorage.token,
            },
         };

         const res = await api.post('/product/create', values, config);
         const data = res.data;

         if (data.success) {
            set((prevState) => ({
               products: [...prevState.products, data.product],
            }));
            toast.success(data.message);
         }
      } catch (error) {
         toast.error(error.response.data.error);
      }
   },

   deleteProduct: async (values) => {},
}));
