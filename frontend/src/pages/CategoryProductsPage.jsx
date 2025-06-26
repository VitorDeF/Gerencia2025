import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategory, createProduct, updateProduct, inactivateProduct } from '../api';

const CategoryProductsPage = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [nome, setNome] = useState('');
        const [selectedProduct, setSelectedProduct] = useState(null);

    const [quantidade, setQuantidade] = useState(0);
    const [descricaoMovimentacao, setDescricaoMovimentacao] = useState('');
    const [loadingId, setLoadingId] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [modalValue, setModalValue] = useState('');

    useEffect(() => {
        const load = async () => {
            const all = await fetchProductsByCategory(categoryId);
            setProducts(all);
        };
        load();
    }, [categoryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novoProduto = {
            nome,
            quantidade,
            categoriaId: Number(categoryId),
            descricaoMovimentacao
        };
        try {
            await createProduct(novoProduto);
            setNome('');
            setQuantidade(0);
            setDescricaoMovimentacao('');
            const all = await fetchProductsByCategory(categoryId);
            setProducts(all);
        } catch (error) {
            alert('Erro ao criar produto');
        }
    };

    const refreshProducts = async () => {
        const all = await fetchProductsByCategory(categoryId);
        setProducts(all);
    };

    const openModal = (type, product) => {
        setSelectedProduct(product);
        setModalType(type);
        setModalValue('');
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setModalType(null);
        setModalValue('');
    };

    const handleConfirmAdd = async () => {
        const addQty = Number(modalValue);
        if (isNaN(addQty) || addQty <= 0) return;
        setLoadingId(selectedProduct.id);
        try {
            await updateProduct(selectedProduct.id, {
                nome: selectedProduct.nome,
                quantidade: selectedProduct.quantidade + addQty,
                categoriaId: selectedProduct.categoria.id,
            });
            await refreshProducts();
            window.location.reload();
        } finally {
            setLoadingId(null);
            closeModal();
        }
    };

    const handleConfirmRemove = async () => {
        const removeQty = Number(modalValue);
        if (isNaN(removeQty) || removeQty <= 0 || removeQty > selectedProduct.quantidade) return;
        setLoadingId(selectedProduct.id);
        try {
            await updateProduct(selectedProduct.id, {
                nome: selectedProduct.nome,
                quantidade: selectedProduct.quantidade - removeQty,
                categoriaId: selectedProduct.categoria.id,
            });
            await refreshProducts();
            window.location.reload();
        } finally {
            setLoadingId(null);
            closeModal();
        }
    };

    const handleConfirmDelete = async () => {
        setLoadingId(selectedProduct.id);
        try {
            await inactivateProduct(selectedProduct.id);
            await refreshProducts();
            window.location.reload();
        } finally {
            setLoadingId(null);
            closeModal();
        }
    };

    return (
        <div>
            <h2 className="product-card-title">Produtos</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <h3>Adicionar Produto nesta Categoria</h3>
                <div>
                    <label>Nome do Produto:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Quantidade:</label>
                    <input
                        type="number"
                        value={quantidade}
                        min="0"
                        onChange={(e) => setQuantidade(Math.max(0, Number(e.target.value)))}
                        required
                    />
                </div>
                <div>
                    <label>Descrição da Movimentação:</label>
                    <input
                        type="text"
                        value={descricaoMovimentacao}
                        onChange={(e) => setDescricaoMovimentacao(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Adicionar Produto</button>
            </form>
            <div className="product-cards-container" style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                {products
                    .filter(product => product.ativo !== false)
                    .map(product => (
                    <div
                        className="product-card"
                        key={product.id}
                        style={{ cursor: 'pointer', position: 'relative', opacity: loadingId === product.id ? 0.5 : 1 }}
                        onClick={() => setSelectedProduct(product)}
                    >
                        <span className="product-icon" role="img" aria-label="Produto">🛒</span>
                        <div className="product-name">{product.nome}</div>
                        <div className="product-qty">Quantidade: <b>{product.quantidade}</b></div>
                        {product.categoria && (
                            <div className="product-category">
                                Categoria: <b>{product.categoria.nome}</b>
                            </div>
                        )}
                        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                            <button
                                onClick={e => { e.stopPropagation(); openModal('add', product); }}
                                disabled={loadingId === product.id}
                                title="Adicionar quantidade"
                                style={{
                                    background: '#e0ffe0',
                                    border: '1px solid #4caf50',
                                    borderRadius: 6,
                                    padding: '3px 10px',
                                    color: '#388e3c',
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                            >
                                +
                            </button>
                            <button
                                onClick={e => { e.stopPropagation(); openModal('remove', product); }}
                                disabled={loadingId === product.id}
                                title="Remover quantidade"
                                style={{
                                    background: '#fffbe0',
                                    border: '1px solid #ffb300',
                                    borderRadius: 6,
                                    padding: '4px 10px',
                                    color: '#ff9800',
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                            >
                                -
                            </button>
                            <button
                                onClick={e => { e.stopPropagation(); openModal('delete', product); }}
                                disabled={loadingId === product.id}
                                title="Inativar produto"
                                style={{
                                    background: '#ffe0e0',
                                    border: '1px solid #f44336',
                                    borderRadius: 6,
                                    padding: '4px 10px',
                                    color: '#c62828',
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {modalType === 'add' && selectedProduct && (
                <div className="modal-bg" style={modalBgStyle} onClick={closeModal}>
                    <div style={modalStyle} onClick={e => e.stopPropagation()}>
                        <h3>Adicionar quantidade</h3>
                        <p>Produto: <b>{selectedProduct.nome}</b></p>
                        <input
                            type="number"
                            min={1}
                            value={modalValue}
                            onChange={e => setModalValue(e.target.value)}
                            placeholder="Quantidade"
                            style={{ width: 100, marginBottom: 12 }}
                        />
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={handleConfirmAdd} style={{ background: '#4caf50', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', fontWeight: 'bold' }}>Confirmar</button>
                            <button onClick={closeModal} style={{ background: '#eee', border: 'none', borderRadius: 4, padding: '6px 16px' }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
            {modalType === 'remove' && selectedProduct && (
                <div className="modal-bg" style={modalBgStyle} onClick={closeModal}>
                    <div style={modalStyle} onClick={e => e.stopPropagation()}>
                        <h3>Remover quantidade</h3>
                        <p>Produto: <b>{selectedProduct.nome}</b></p>
                        <input
                            type="number"
                            min={1}
                            max={selectedProduct.quantidade}
                            value={modalValue}
                            onChange={e => setModalValue(e.target.value)}
                            placeholder="Quantidade"
                            style={{ width: 100, marginBottom: 12 }}
                        />
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={handleConfirmRemove} style={{ background: '#ff9800', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', fontWeight: 'bold' }}>Confirmar</button>
                            <button onClick={closeModal} style={{ background: '#eee', border: 'none', borderRadius: 4, padding: '6px 16px' }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
            {modalType === 'delete' && selectedProduct && (
                <div className="modal-bg" style={modalBgStyle} onClick={closeModal}>
                    <div style={modalStyle} onClick={e => e.stopPropagation()}>
                        <h3>Inativar produto</h3>
                        <p>Tem certeza que deseja inativar o produto <b>{selectedProduct.nome}</b>?</p>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={handleConfirmDelete} style={{ background: '#f44336', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', fontWeight: 'bold' }}>Confirmar</button>
                            <button onClick={closeModal} style={{ background: '#eee', border: 'none', borderRadius: 4, padding: '6px 16px' }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const modalBgStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
};
const modalStyle = {
    background: '#fff',
    padding: 24,
    borderRadius: 8,
    minWidth: 300,
    position: 'relative'
};

export default CategoryProductsPage;