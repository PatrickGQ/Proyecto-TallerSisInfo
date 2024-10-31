// BranchesPage.jsx
import React from 'react';
import BranchList from './Components/BranchList';
import RegisterBranch from './Components/RegisterBranch';

const BranchesPage = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Gestión de Sucursales</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BranchList />
                <RegisterBranch />
            </div>
        </div>
    );
};

export default BranchesPage;
