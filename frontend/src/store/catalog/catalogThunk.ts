import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCatalog, deleteCatalog, getCatalogs, updateCatalog } from "../../services/catalogService";
import { Catalog } from "../../types/catalog.type";

export const fetchCatalogs = createAsyncThunk(
    "catalogs/fetchCatalogs",
    async () => {
      const response = await getCatalogs();
      return response.data;
    }
  );
  
  export const addCatalog = createAsyncThunk(
    "catalogs/addCatalog",
    async (newCatalog: Catalog) => {
      const response = await createCatalog(newCatalog);
      return response.data;
    }
  );
  
  export const updateCatalogThunk = createAsyncThunk(
    "catalogs/updateCatalog",
    async ({ id, updatedCatalog }: { id: string; updatedCatalog: Catalog }) => {
      const response = await updateCatalog(id, updatedCatalog);
      return response.data;
    }
  );
  
  export const deleteCatalogThunk = createAsyncThunk(
    "catalogs/deleteCatalog",
    async (id: string) => {
      await deleteCatalog(id);
      return id;
    }
  );