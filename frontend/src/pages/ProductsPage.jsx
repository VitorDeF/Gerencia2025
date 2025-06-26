import React, { useEffect, useState } from 'react';
import ProductList from '../components/Products/ProductList';
import ProductForm from '../components/Products/ProductForm';
import { fetchProducts, createProduct, fetchCategories } from '../api';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const cats = await fetchCategories();
            const prods = await fetchProducts();
            console.log('products:', prods);
            setCategories(cats);
            setProducts(prods);
            setLoading(false);
        };
        loadData();
    }, []);

const handleProductCreation = async (productData) => {
    try {
        const newProduct = await createProduct(productData);
        setProducts([...products, newProduct]);
    } catch (error) {
        alert(error.response?.data?.message || 'Erro ao criar produto');
        console.error('Erro ao criar produto:', error);
    }
};

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Carregando...</div>;
    }

    return (
        <div>
            <ProductForm onCreate={handleProductCreation} categories={categories} />
            <ProductList products={products} />
        </div>
    );
};

export default ProductsPage;