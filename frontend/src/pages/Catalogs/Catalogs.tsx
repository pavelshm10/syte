import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
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
const Catalogs: React.FC = () => {
  const loading = useAppSelector((state) => state.catalogs.loading);
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCatalog, setCurrentCatalog] = useState<Catalog | null>(null);
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

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        Add Catalog
      </Button>
      <Box className={classes.catalogs_container}>
        {loading ? (
          <CircularProgress size={80} />
        ) : (
          <CatalogTable onOpenModal={handleOpenModal} />
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
