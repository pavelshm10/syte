import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Catalog } from "../../types/catalog.type";
import {
  addCatalog,
  deleteCatalogThunk,
  fetchCatalogs,
  updateCatalogThunk,
} from "./catalogThunk";
import { makeAllOtherCatlogsNoPrimary } from "../../utils/catalog.util";

interface CatalogsState {
  catalogs: Catalog[];
  loading: boolean;
  error: string | null;
}

const initialState: CatalogsState = {
  catalogs: [],
  loading: false,
  error: null,
};

const catalogsSlice = createSlice({
  name: "catalogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCatalogs.fulfilled,
        (state, action: PayloadAction<Catalog[]>) => {
          state.loading = false;
          state.catalogs = action.payload;
        }
      )
      .addCase(fetchCatalogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch catalogs";
      })
      .addCase(
        addCatalog.fulfilled,
        (state, action: PayloadAction<Catalog>) => {
          makeAllOtherCatlogsNoPrimary(state.catalogs, action.payload);
          state.catalogs.push(action.payload);
        }
      )
      .addCase(
        updateCatalogThunk.fulfilled,
        (state, action: PayloadAction<Catalog>) => {
          const index = state.catalogs.findIndex(
            (catalog) => catalog._id === action.payload._id
          );
          if (index !== -1) {
            makeAllOtherCatlogsNoPrimary(state.catalogs, action.payload);
            state.catalogs[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteCatalogThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.catalogs = state.catalogs.filter(
            (catalog) => catalog._id !== action.payload
          );
        }
      );
  },
});

export default catalogsSlice.reducer;
