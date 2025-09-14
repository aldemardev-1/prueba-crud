import { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import { type Product } from '../types/Product';
import * as productService from '../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsData, totalValueData] = await Promise.all([
        productService.getProducts(),
        productService.getTotalValue(),
      ]);
      setProducts(productsData);
      setTotalValue(totalValueData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await productService.deleteProduct(id);
      loadData();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSave = () => {
    setEditingProduct(null);
    loadData();
  };

  if (loading) {
    return <div className="text-center text-xl text-gray-500 mt-10">Cargando...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Inventario de Productos</h2>
      
      <div className="bg-blue-100 text-blue-800 p-4 rounded-lg mb-6 shadow-sm">
        <h3 className="text-xl font-semibold">Valor Total del Inventario</h3>
        <p className="text-3xl font-bold">${totalValue.toFixed(2)}</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-inner">
        <h3 className="text-xl font-semibold mb-4">
          {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </h3>
        <ProductForm product={editingProduct} onSave={handleSave} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Descripción</th>
              <th className="py-3 px-6 text-left">Precio</th>
              <th className="py-3 px-6 text-left">Stock</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{product.nombre}</td>
                <td className="py-3 px-6 text-left">{product.descripcion}</td>
                <td className="py-3 px-6 text-left">${product.precio.toFixed(2)}</td>
                <td className="py-3 px-6 text-left">{product.cantidadEnStock}</td>
                <td className="py-3 px-6 text-center space-x-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-xs transition duration-300"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs transition duration-300"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;