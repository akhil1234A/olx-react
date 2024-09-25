import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./Posts.css";
import Heart from "../../assets/Heart"; 
import { useNavigate } from "react-router-dom";
import Delete from '../../assets/Delete';

const Posts = ({ search = "" }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5); // Number of products to show initially

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter((product) => product.id !== id));
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Filter the products based on the search term
  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.category?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Show 4 more products
  };
  
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>
            {visibleCount < filteredProducts.length && (
              <button onClick={handleSeeMore} className="see-more">
                See More
              </button>
            )}
          </span>
        </div>
        <div className="cards">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => navigate(`/view/${product.id}`)}
            >
              <div className="favorite">
                <Heart />
                <span
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    handleDelete(product.id);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <Delete />
                </span>
              </div>
              <div className="image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="category">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
