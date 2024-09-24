import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config"; // Adjust the path to your Firebase config
import "./Posts.css";
import Heart from "../../assets/Heart"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";
import Delete from '../../assets/Delete'

const Posts = ({ search = "" }) => { // Default value for search
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

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

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
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
                  style={{ cursor: 'pointer' }} // Ensure the cursor shows it's clickable
                >
                  <Delete />
                </span>
              </div>
             
              <div className="image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
    
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {filteredProducts.map((product) => (
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
                  style={{ cursor: 'pointer' }} // Ensure the cursor shows it's clickable
                >
                  <Delete />
                </span>
              </div>
              <div className="productImage">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="productCategory">{product.category}</span>
                <p className="productName">{product.name}</p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
