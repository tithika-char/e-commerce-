import React, { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [company, setCompany] = React.useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/product/${id}`);
        const product = await response.json();
        
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setCompany(product.company);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    fetchProduct();
  }, [id]);

  const updateProduct = async () => {
 const response = await fetch(`http://localhost:5000/product/${id}`, {
        method: 'PUT',
        body: JSON.stringify( {name,price,category,company}),
        headers: {
          'Content-Type': 'application/json'
        },
       
      });
      const result = await response.json();
      console.warn(result);
      navigate('/')
    
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button onClick={updateProduct} className="appButton">
        Update product
      </button>
    </div>
  );
};

export default UpdateProduct;
