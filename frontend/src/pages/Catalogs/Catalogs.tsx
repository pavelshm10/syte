import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from "@mui/material";
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
import Navbar from "../../components/Navbar/Navbar";
const Catalogs: React.FC = () => {
  const loading = useAppSelector((state) => state.catalogs.loading);
  const catalogs = useAppSelector((state) => state.catalogs.catalogs);
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCatalog, setCurrentCatalog] = useState<Catalog | null>(null);
  const [filteredCatalogs, setFilteredCatalogs] = useState<Catalog[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isMultiLocalFilter, setIsMultiLocalFilter] = useState(false);

  useEffect(() => {
    dispatch(fetchCatalogs());
  }, [dispatch]);

  const handleAddCatalog = async (values: Catalog) => {
    console.log("add");
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
      catalogs
        .filter((catalog: Catalog) => {
          if (searchTerm.trim() !== "") {
            return catalog.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          }
          return true;
        })
        .filter((catalog: Catalog) => {
          if (isMultiLocalFilter) {
            return catalog.locales.length > 1;
          }
          return true;
        })
    );
  }, [searchTerm, catalogs, isMultiLocalFilter]);

  return (
    <>
      <Navbar
        onAddCatalog={() => setModalOpen(true)}
        onSearchTerm={(searchTerm) => setSearchTerm(searchTerm)}
        onMultiLocalChecked={(isMultiLocalChecked) =>
          setIsMultiLocalFilter(isMultiLocalChecked)
        }
      />
      {loading ? (
        <Box display="flex" alignItems="center" height="100vh">
          <CircularProgress size={80} />
        </Box>
      ) : (
        <CatalogTable
          catalogs={filteredCatalogs}
          onOpenModal={handleOpenModal}
        />
      )}
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
