import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../image/cesinhabitcoin.png';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            
            <div className="navbar-logo"><img src={logo} width={80} height={75} />StockApp <p className='byLittleTitle'>by CesinhaBitcoin</p></div>
            <ul className="navbar-links">
                <li className={location.pathname === '/categorias' ? 'active' : ''}>
                    <Link to="/categorias">Categorias</Link>
                </li>
                <li className={location.pathname === '/produtos' ? 'active' : ''}>
                    <Link to="/produtos">Produtos</Link>
                </li>
                <li className={location.pathname === '/movimentacoes' ? 'active' : ''}>
                    <Link to="/movimentacoes">Movimentações</Link>
                </li>
                <li className={location.pathname === '/login' ? 'active' : ''}>
                    <Link to="/login">Sair</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;