import { useState, useEffect } from 'react';
import { type Product } from '../types/Product';
import * as productService from '../services/productService';

interface ProductFormProps {
  product: Product | null;
  onSave: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidadEnStock: 0,
  });
  const [errors, setErrors] = useState({
    nombre: '',
    precio: '',
    cantidadEnStock: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        precio: 0,
        cantidadEnStock: 0,
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'precio' || name === 'cantidadEnStock' ? Number(value) : value,
    }));
  };

  const validate = () => {
    const newErrors = {
      nombre: '',
      precio: '',
      cantidadEnStock: '',
    };
    let isValid = true;

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio.';
      isValid = false;
    }

    if (formData.precio <= 0) {
      newErrors.precio = 'El precio debe ser un número positivo.';
      isValid = false;
    }

    if (formData.cantidadEnStock < 0) {
      newErrors.cantidadEnStock = 'La cantidad en stock no puede ser negativa.';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      if (product) {
        await productService.updateProduct(product.id, formData as Product);
      } else {
        await productService.createProduct(formData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
      </div>
      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <input
          type="text"
          name="descripcion"
          id="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
          Precio
        </label>
        <input
          type="number"
          name="precio"
          id="precio"
          value={formData.precio}
          onChange={handleChange}
          step="0.01"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.precio && <p className="text-red-500 text-xs mt-1">{errors.precio}</p>}
      </div>
      <div>
        <label htmlFor="cantidadEnStock" className="block text-sm font-medium text-gray-700">
          Cantidad en Stock
        </label>
        <input
          type="number"
          name="cantidadEnStock"
          id="cantidadEnStock"
          value={formData.cantidadEnStock}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.cantidadEnStock && <p className="text-red-500 text-xs mt-1">{errors.cantidadEnStock}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
      >
        {product ? 'Actualizar Producto' : 'Crear Producto'}
      </button>
      {product && (
        <button
          type="button"
          onClick={() => onSave()}
          className="w-full bg-gray-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-500 transition duration-300 mt-2"
        >
          Cancelar
        </button>
      )}
    </form>
  );
};

export default ProductForm;