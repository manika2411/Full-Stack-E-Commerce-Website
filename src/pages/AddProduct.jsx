import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

export default function AddProduct() {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    rating: '',
    image: ''
  });

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/product', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch products:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setProduct({
      title: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      rating: '',
      image: ''
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        setMessage("❌ Unauthorized access. Please login as admin.");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      if (editingId) {
        await axios.put(`/product/${editingId}`, product, { headers });
        setMessage('✅ Product updated successfully!');
      } else {
        await axios.post('/product', product, { headers });
        setMessage('✅ Product added successfully!');
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("❌ Add/Update product error:", err.response?.data || err.message);
      setMessage(`❌ Failed: ${err.response?.data?.message || 'Add/update product failed.'}`);
    }
  };

  const handleEdit = (prod) => {
    setProduct({
      title: prod.title,
      description: prod.description,
      price: prod.price,
      category: prod.category,
      stock: prod.stock,
      rating: prod.rating,
      image: prod.image
    });
    setEditingId(prod._id);
    setMessage('');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('🗑️ Product deleted');
      fetchProducts();
    } catch (err) {
      console.error("❌ Delete error:", err.response?.data || err.message);
      setMessage('❌ Failed to delete product.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl mx-auto mb-10 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">
          {editingId ? 'Update Product' : 'Add New Product'}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input name="title" value={product.title} onChange={handleChange} placeholder="Title" required className="px-4 py-2 border rounded" />
          <input name="price" value={product.price} onChange={handleChange} placeholder="Price" type="number" required className="px-4 py-2 border rounded" />
          <input name="category" value={product.category} onChange={handleChange} placeholder="Category" required className="px-4 py-2 border rounded" />
          <input name="stock" value={product.stock} onChange={handleChange} placeholder="Stock" type="number" required className="px-4 py-2 border rounded" />
          <input name="rating" value={product.rating} onChange={handleChange} placeholder="Rating" type="number" required className="px-4 py-2 border rounded" />
          <input name="image" value={product.image} onChange={handleChange} placeholder="Image URL" required className="px-4 py-2 border rounded" />
        </div>

        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" required className="w-full px-4 py-2 border rounded" />

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
        {message && <p className="text-center mt-2 text-sm">{message}</p>}
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white rounded shadow p-4 flex flex-col">
            <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="text-lg font-bold">{p.title}</h3>
            <p className="text-sm text-gray-600 mb-1">₹{p.price}</p>
            <p className="text-sm">{p.category}</p>
            <p className="text-sm text-gray-500">Stock: {p.stock} | Rating: {p.rating}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">
                Edit
              </button>
              <button onClick={() => handleDelete(p._id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
