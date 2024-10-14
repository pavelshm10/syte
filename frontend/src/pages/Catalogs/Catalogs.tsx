import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Catalog } from "../../types/catalog.type";
import CatalogModal from "../../components/CatalogModal/CatalogModal";
import CatalogTable from "../../components/CatalogTable/CatalogTable";
import { createCatalog, updateCatalog } from "../../services/catalogService";

const Catalogs: React.FC = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCatalog, setCurrentCatalog] = useState<Catalog | null>(null);

  const handleAddCatalog = async (values: Catalog) => {
    try {
      console.log({values});
      await createCatalog(values);
    } catch (error) {
      console.error("Error adding catalog:", error);
    }
  };

  const handleEditCatalog = async (values: Catalog) => {
    try {
      await updateCatalog(values._id!, values);
    } catch (error) {
      console.error("Error updaing catalog:", error);
    }
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
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        Add Catalog
      </Button>
      <CatalogTable onOpenModal={handleOpenModal} />
      <CatalogModal
        open={modalOpen}
        handleClose={handleCloseModal}
        catalog={currentCatalog}
        handleSubmit={currentCatalog ? handleEditCatalog : handleAddCatalog}
      />
    </div>
  );
};

export default Catalogs;
