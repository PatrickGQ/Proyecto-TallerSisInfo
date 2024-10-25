import React, { createContext, useContext, useState, useEffect } from 'react';
import { getBranchsRequest } from '../api/branch';

interface Branch {
  _id: string;
  branchName: string;
}

interface BranchContextType {
  selectedBranch: Branch | null; // Cambié a Branch | null para manejar un objeto de sucursal
  setSelectedBranch: React.Dispatch<React.SetStateAction<Branch | null>>;
  branches: Branch[]; // Estado para almacenar las sucursales
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export const BranchProvider = ({ children }) => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]); // Estado para las sucursales

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await getBranchsRequest(); 
        await console.log(response)
        setBranches(response.data); // Actualizamos el estado con las sucursales recibidas
      } catch (error) {
        console.error('Error al obtener las sucursales:', error);
      }
    };

    fetchBranches();
  }, []);

  return (
    <BranchContext.Provider value={{ selectedBranch, setSelectedBranch, branches }}>
      {children}
    </BranchContext.Provider>
  );
};

export const useBranch = () => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error("useBranch debe estar dentro de un BranchProvider");
  }
  return context;
};
