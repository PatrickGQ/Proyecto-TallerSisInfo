// RegisterBranch.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { API } from '../../../api/conf/routeApi';


const RegisterBranch = () => {
    const [nameBranch, setNameBranch] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${ API }/branches`, { nameBranch, address, phone });
            setMessage(response.data.message);
            setNameBranch('');
            setAddress('');
            setPhone('');
            window.location.reload();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error al registrar la sucursal');
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 max-w-md w-full mx-auto mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Registrar Sucursal</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label className="block font-medium text-gray-700">Nombre:</label>
                    <input
                        type="text"
                        value={nameBranch}
                        onChange={(e) => setNameBranch(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Dirección:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Teléfono:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
                <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors">
                    Registrar
                </button>
            </form>
            {message && <p className="mt-4 text-center font-medium text-green-600">{message}</p>}
        </div>
    );
};

export default RegisterBranch;
