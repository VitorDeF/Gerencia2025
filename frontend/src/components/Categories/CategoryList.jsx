import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../api';
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        getCategories();
    }, []);

    return (
        <div>
            <h2 className='category-card-title'>Categorias</h2>
            <div className="category-cards-container">
                {categories.map(category => (
                    <div 
                        className="category-card" 
                        key={category.id}
                        onClick={() => navigate(`/categorias/${category.id}`)}
                        style={{ cursor: 'pointer', border: '1px solid #ccc', margin: 8, padding: 8 }}
                    >
                        <span className="category-icon" role="img" aria-label="Categoria">📦</span>
                        <div className="category-name">{category.nome}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;