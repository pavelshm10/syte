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
import { CATALOGS } from "../../constants/catalogs";
import { AddCatalogButton } from "../../styles/catalogStyles";
const Catalogs: React.FC = () => {
  const loading = useAppSelector((state) => state.catalogs.loading);
  const catalogs = useAppSelector((state) => state.catalogs.catalogs);
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCatalog, setCurrentCatalog] = useState<Catalog | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCatalogs, setFilteredCatalogs] = useState<Catalog[]>([]);
  const [isMultiLocalFilter, setIsMultiLocalFilter] = useState(false);

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
      <div className={classes.navbar}>
        <Button
          variant="outlined"
          sx={AddCatalogButton}
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
        <FormControlLabel
          control={
            <Checkbox
              checked={isMultiLocalFilter}
              onChange={(e) => setIsMultiLocalFilter(e.target.checked)}
            />
          }
          label={CATALOGS.SHOW_MULTI_LOCAL_ONLY}
        />
      </div>

      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          height="100vh"
        >
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
