import React, { useState } from 'react';
import { createCategory } from '../../api';

const CategoryForm = ({ onCategoryCreated }) => {
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const newCategory = await createCategory({ nome: categoryName });
            if (onCategoryCreated) onCategoryCreated(newCategory);
            setCategoryName('');
        } catch (err) {
            setError(`Falha ao criar categoria. Tente novamente. ${err.message}`);
        }
    };

    return (
        <div className="category-form-card">
            <h2>Criar Categoria</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="categoryName">Nome da Categoria:</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                        placeholder="Digite o nome da categoria"
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Criar Categoria</button>
            </form>
        </div>
    );
};

export default CategoryForm;