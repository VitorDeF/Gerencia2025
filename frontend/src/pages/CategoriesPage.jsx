import React, { useState } from 'react';
import CategoryForm from '../components/Categories/CategoryForm';
import CategoryList from '../components/Categories/CategoryList';

const CategoriesPage = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <div>
            <CategoryForm onCategoryCreated={() => setRefresh(r => !r)} />
            <CategoryList key={refresh} />
        </div>
    );
};

export default CategoriesPage;