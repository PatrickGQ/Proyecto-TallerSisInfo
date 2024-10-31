// BranchList.jsx
import React, { useEffect } from 'react';
import { useBranch } from '../../../CONTEXTS/BranchContext';


const BranchList = () => {
    const { branches, setSelectedBranch } = useBranch();

    useEffect(() => {}, []);

    return (
        <div className="bg-white shadow rounded-lg p-4 max-w-md w-full mx-auto mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Sucursales</h2>
            <ul className="space-y-2">
                {branches.map((branch) => (
                    <li
                        key={branch._id}
                        onClick={() => {
                            setSelectedBranch(branch.nameBranch);
                        }}
                        className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors">
                        <p className="font-medium text-gray-800">{branch.nameBranch}</p>
                        <p className="text-sm text-gray-600">{branch.address}</p>
                        <p className="text-sm text-gray-600">{branch.phone}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BranchList;
