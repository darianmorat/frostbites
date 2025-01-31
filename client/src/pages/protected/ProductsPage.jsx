import { useState, useEffect } from 'react';
import { AnimatedContainer } from '../../components/AnimatedContainer';
import { useProductStore } from '../../stores/useProductStore';
import { CreateProduct } from '../../components/protected/CreateProduct';
import { EditProduct } from '../../components/protected/EditProduct';
import { DeleteProduct } from '../../components/protected/DeleteProduct';
import '../protected.css'

// USE REACT MODAL FOR POPUPS

const ProductsPage = () => {
   const { fetchProducts, products } = useProductStore();

   const [deletePopup, setDeletePopup] = useState(null);
   const [editPopup, setEditPopup] = useState(null);
   const [activeBtn, setActiveBtn] = useState('explore');

   const toggleActive = (button) => {
      setActiveBtn(button);
   };

   useEffect(() => {
      fetchProducts();
   }, [fetchProducts]);

   return (
      <div className="shop">
         <AnimatedContainer>
            <div className="shop-container">
               <div className="right-section-admin">
                  <div className="buttons-section">
                     <button
                        className={`explore-btn btn ${activeBtn === 'explore' ? 'active' : 'inactive'}`}
                        onClick={() => toggleActive('explore')}
                     >
                        Ice cream catalog
                     </button>
                     <button
                        className={`make-btn btn ${activeBtn === 'make' ? 'active' : 'inactive'}`}
                        onClick={() => toggleActive('make')}
                     >
                        Extras for ice cream
                     </button>
                  </div>

                  {activeBtn === 'explore' && (
                     <div className="product-list-admin">
                        {products.length === 0 ? (
                           <div className="no-product-available">
                              <p>It seems like there&apos;s no products available</p>
                              <p>Add some!</p>

                              <CreateProduct />
                           </div>
                        ) : (
                           <>
                              {products.map((product) => (
                                 <div key={product.product_id} className="product-item-admin">
                                    <img
                                       src={product.product_img}
                                       alt={product.product_name}
                                       className="product-img"
                                    />
                                    <p className="product-price">
                                       {' '}
                                       ${product.product_price} USD
                                    </p>
                                    <h2 className="product-name">
                                       {' '}
                                       {product.product_name}
                                    </h2>

                                    <div className="admin-actions">
                                       <button
                                          className="btn admin-edit-btn secondary-btn"
                                          onClick={() => {
                                             setEditPopup(product.product_id);
                                          }}
                                       >
                                          Edit
                                       </button>
                                       <button
                                          className="btn remove-btn admin-delete-btn"
                                          onClick={() =>
                                             setDeletePopup(product.product_id)
                                          }
                                       >
                                          Remove
                                       </button>
                                    </div>

                                    <EditProduct
                                       editPopup={editPopup}
                                       setEditPopup={setEditPopup}
                                       productId={product.product_id}
                                       productImg={product.product_img}
                                       productName={product.product_name}
                                       productPrice={product.product_price}
                                    />
                                    <DeleteProduct
                                       deletePopup={deletePopup}
                                       setDeletePopup={setDeletePopup}
                                       productId={product.product_id}
                                       productName={product.product_name}
                                    />
                                 </div>
                              ))}

                              <CreateProduct />
                           </>
                        )}
                     </div>
                  )}

                  {activeBtn === 'make' && (
                     <div className="product-list make">
                        <p>In progress</p>
                     </div>
                  )}
               </div>
            </div>
         </AnimatedContainer>
      </div>
   );
};

export default ProductsPage;
