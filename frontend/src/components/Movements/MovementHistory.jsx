import React, { useEffect, useState } from 'react';
import { fetchMovementHistory } from '../../api';

const MovementHistory = () => {
    const [movements, setMovements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMovements = async () => {
            try {
                const data = await fetchMovementHistory();
                setMovements(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getMovements();
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Carregando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="movement-history-container">
            <h2>Histórico de Movimentações</h2>
            <table className="movement-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Descrição</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {movements.map(movement => (
                        <tr key={movement.id}>
                            <td>{movement.id}</td>
                            <td>{movement.produtoId.nome}</td>
                            <td>{movement.quantidade}</td>
                            <td>{movement.descricao}</td>
                            <td>
                                {movement.data
                                    ? new Date(movement.data).toLocaleString()
                                    : ''}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovementHistory;