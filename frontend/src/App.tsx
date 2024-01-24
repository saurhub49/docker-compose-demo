import { useEffect, useState } from 'react';
import axios from 'axios';

type Product = {
  id: number;
  name: string;
  price: number;
};

const App = () => {
  const apiUrl = 'http://localhost:8080/api/products';

  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [editProductName, setEditProductName] = useState('');
  const [editProductPrice, setEditProductPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiUrl);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async () => {
    try {
      const response = await axios.post(apiUrl, {
        name: newProductName,
        price: parseFloat(newProductPrice),
      });
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setNewProductName('');
      setNewProductPrice('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const startEditingProduct = (id: number, name: string, price: number) => {
    setEditProductId(id);
    setEditProductName(name);
    setEditProductPrice(price.toString());
  };

  const cancelEditingProduct = () => {
    setEditProductId(null);
    setEditProductName('');
    setEditProductPrice('');
  };

  const updateProduct = async () => {
    try {
      await axios.put(`${apiUrl}/${editProductId}`, {
        name: editProductName,
        price: parseFloat(editProductPrice),
      });
      fetchProducts();
      cancelEditingProduct();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Product List</h1>
      <table style={{ borderCollapse: 'collapse', width: '80%', margin: 'auto' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Price</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '8px', textAlign: 'left' }}>{product.id}</td>
              {editProductId === product.id ? (
                <>
                  <td style={{ padding: '8px', textAlign: 'left' }}>
                    <input
                      style={{ border: '1px solid #ccc', padding: '6px' }}
                      type="text"
                      value={editProductName}
                      onChange={(e) => setEditProductName(e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '8px', textAlign: 'left' }}>
                    <input
                      style={{ border: '1px solid #ccc', padding: '6px' }}
                      type="text"
                      value={editProductPrice}
                      onChange={(e) => setEditProductPrice(e.target.value)}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td style={{ padding: '8px', textAlign: 'left' }}>{product.name}</td>
                  <td style={{ padding: '8px', textAlign: 'left' }}>{product.price}</td>
                </>
              )}
              <td style={{ padding: '8px', textAlign: 'left' }}>
                {editProductId === product.id ? (
                  <>
                    <button
                      style={{ backgroundColor: '#4CAF50', color: 'white', padding: '6px', borderRadius: '4px', marginRight: '4px' }}
                      onClick={updateProduct}
                    >
                      Update
                    </button>
                    <button
                      style={{ backgroundColor: '#ccc', padding: '6px', borderRadius: '4px' }}
                      onClick={cancelEditingProduct}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{ backgroundColor: '#2196F3', color: 'white', padding: '6px', borderRadius: '4px', marginRight: '4px' }}
                      onClick={() =>
                        startEditingProduct(product.id, product.name, product.price)
                      }
                    >
                      Edit
                    </button>
                    <button
                      style={{ backgroundColor: '#f44336', color: 'white', padding: '6px', borderRadius: '4px' }}
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Add Product</h2>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Name:
          <input
            style={{ border: '1px solid #ccc', padding: '6px' }}
            type="text"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Price:
          <input
            style={{ border: '1px solid #ccc', padding: '6px' }}
            type="text"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
          />
        </label>
        <button
          style={{ backgroundColor: '#2196F3', color: 'white', padding: '6px', borderRadius: '4px' }}
          onClick={addProduct}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default App;
