import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { Catalog } from "../../types/catalog.type";
import CatalogModal from "../../components/CatalogModal/CatalogModal";
import CatalogTable from "../../components/CatalogTable/CatalogTable";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import {
  addCatalog,
  fetchCatalogs,
  updateCatalogThunk,
} from "../../store/catalog/catalogThunk";
import classes from "./Catalogs.module.css";
import { CATALOGS } from "../../constants/catalogs";
const Catalogs: React.FC = () => {
  const loading = useAppSelector((state) => state.catalogs.loading);
  const catalogs = useAppSelector((state) => state.catalogs.catalogs);
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCatalog, setCurrentCatalog] = useState<Catalog | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCatalogs, setFilteredCatalogs] = useState<Catalog[]>([]);

  useEffect(() => {
    dispatch(fetchCatalogs());
  }, [dispatch]);

  const handleAddCatalog = async (values: Catalog) => {
    dispatch(addCatalog(values));
  };

  const handleEditCatalog = async (values: Catalog) => {
    dispatch(updateCatalogThunk({ id: values._id!, updatedCatalog: values }));
  };

  const handleOpenModal = (catalog: Catalog) => {
    setModalOpen(true);
    setCurrentCatalog(catalog || null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentCatalog(null);
  };

  useEffect(() => {
    if (!catalogs) return;
    setFilteredCatalogs(
      searchTerm
        ? catalogs.filter((catalog) =>
            catalog.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : catalogs
    );
  }, [searchTerm, catalogs]);

  return (
    <>
      <div className={classes.navbar}>
        <Button
          variant="outlined"
          sx={{ fontWeight: "bold" }}
          onClick={() => setModalOpen(true)}
        >
          {CATALOGS.ADD_CATALOGS}
        </Button>
        <TextField
          label={CATALOGS.SEARCH_CATLOGS_BY_NAME}
          variant="standard"
          value={searchTerm}
          sx={{ margin: "auto", width: 200 }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Box className={classes.catalogs_table}>
        {loading ? (
          <CircularProgress size={80} />
        ) : (
          <CatalogTable
            catalogs={filteredCatalogs}
            onOpenModal={handleOpenModal}
          />
        )}
      </Box>
      <CatalogModal
        open={modalOpen}
        handleClose={handleCloseModal}
        catalog={currentCatalog}
        handleSubmit={currentCatalog ? handleEditCatalog : handleAddCatalog}
      />
    </>
  );
};

export default Catalogs;
