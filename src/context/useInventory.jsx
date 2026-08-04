import { useContext } from 'react';
import { InventoryContext } from './inventory-context';

export const useInventory = () => useContext(InventoryContext);
