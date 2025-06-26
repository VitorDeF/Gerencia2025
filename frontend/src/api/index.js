import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/usuarios/novoUsuario`, userData, { headers: { 'Content-Type': 'application/json' }});
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.get(`${API_URL}/usuarios/usuarios`);
    const user = response.data.find(
        u => u.username === credentials.username && u.password === credentials.password
    );
    if (user) return user;
    throw new Error('Usuário ou senha inválidos');
};

export const fetchCategories = async () => {
    const response = await axios.get(`${API_URL}/categorias`);
    return response.data;
};

export const createCategory = async (categoryData) => {
    const response = await axios.post(`${API_URL}/novaCategoria`, categoryData, { headers: { 'Content-Type': 'application/json' }});
    return response.data;
};

export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/produtos`);
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await axios.post(`${API_URL}/novoProduto`, productData, { headers: { 'Content-Type': 'application/json' }});
    return response.data;
};

export const fetchMovementHistory = async () => {
    const response = await axios.get(`${API_URL}/movimentacoes`);
    console.log('fetchMovementHistory response:', response.data);
    return response.data;
};

export const fetchProductsByCategory = async (categoriaId) => {
    const response = await axios.get(`${API_URL}/produtos/categoria/${categoriaId}`);
    return response.data;
};

export const updateProduct = async (id, productData) => {
    const response = await axios.put(`${API_URL}/produtos/${id}`, productData, { headers: { 'Content-Type': 'application/json' }});
    return response.data;
};

export const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/produtos/${id}`);
};

export const inactivateProduct = async (id) => {
    await axios.put(`${API_URL}/produtos/inativar/${id}`);
};