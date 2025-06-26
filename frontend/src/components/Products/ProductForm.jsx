import React, { useState } from 'react';
import { createProduct } from '../../api';

const ProductForm = ({ onCreate, categories = [] }) => {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [categoriaId, setCategoriaId] = useState('');
    const [descricaoMovimentacao, setDescricaoMovimentacao] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoriaId) {
            alert('Selecione uma categoria!');
            return;
        }

        const novoProduto = {
            nome,
            quantidade,
            categoriaId: Number(categoriaId),
            descricaoMovimentacao: descricaoMovimentacao || ""
        };

        try {
            if (onCreate) onCreate(novoProduto);
            setNome('');
            setQuantidade(0);
            setCategoriaId('');
            setDescricaoMovimentacao('');
        } catch (error) {
            console.error('Erro ao criar produto:', error, novoProduto);
            alert(error.response?.data?.message || 'Erro ao criar produto');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>Adicionar Produto</h2>
            <div>
                <label htmlFor="nome">Nome do Produto:</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="quantidade">Quantidade:</label>
                <input
                    type="number"
                    id="quantidade"
                    value={quantidade}
                    min="0"
                    onChange={(e) => setQuantidade(Number(e.target.value))}
                    required
                />
            </div>
            <div>
                <label htmlFor="categoria">Categoria:</label>
                <select
                    id="categoria"
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    required
                >
                    <option value="">Selecione uma categoria</option>
                    {Array.isArray(categories) && categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.nome}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="descricaoMovimentacao">Descrição da Movimentação:</label>
                <input
                    type="text"
                    id="descricaoMovimentacao"
                    value={descricaoMovimentacao ? descricaoMovimentacao : ''}
                    onChange={(e) => setDescricaoMovimentacao(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Adicionar Produto</button>
        </form>
    );
};

export default ProductForm;