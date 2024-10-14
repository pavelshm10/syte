import axiosClient from '../api/axiosClient';
import { Catalog } from '../types/catalog.type';

export const getCatalogs = () => axiosClient.get('/');
export const createCatalog = (catalog: Catalog) => axiosClient.post('/', catalog);
export const updateCatalog = (id: string, catalog: Catalog) => axiosClient.put(`/${id}`, catalog);
export const deleteCatalog = (id: string) => axiosClient.delete(`/${id}`);
