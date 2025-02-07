import { useState, useEffect } from 'react';
import { AnimatedContainer } from '../../components/AnimatedContainer';
import { useProductStore } from '../../stores/useProductStore';
import { CreateProduct } from '../../components/protected/CreateProduct';
import { EditProduct } from '../../components/protected/EditProduct';
import { DeleteProduct } from '../../components/protected/DeleteProduct';
import '../protected.css';

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
                                 <div
                                    key={product.id}
                                    className="product-item-admin"
                                 >
                                    <div className="product-img-container">
                                       <img
                                          src={product.url}
                                          alt={product.name}
                                          className="product-img"
                                       />
                                    </div>
                                    <p className="product-price">
                                       {' '}
                                       ${product.price} USD
                                    </p>
                                    <h3 className="product-name">
                                       {' '}
                                       {product.name}
                                    </h3>

                                    <div className="admin-actions">
                                       <button
                                          className="btn admin-edit-btn secondary-btn"
                                          onClick={() => {
                                             setEditPopup(product.id);
                                          }}
                                       >
                                          Edit
                                       </button>
                                       <button
                                          className="btn remove-btn admin-delete-btn"
                                          onClick={() =>
                                             setDeletePopup(product.id)
                                          }
                                       >
                                          Remove
                                       </button>
                                    </div>

                                    <EditProduct
                                       editPopup={editPopup}
                                       setEditPopup={setEditPopup}
                                       productId={product.id}
                                       productImg={product.url}
                                       productName={product.name}
                                       productPrice={product.price}
                                    />
                                    <DeleteProduct
                                       deletePopup={deletePopup}
                                       setDeletePopup={setDeletePopup}
                                       productId={product.id}
                                       productName={product.name}
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
