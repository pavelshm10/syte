import React, { useEffect, useState } from "react";
import {
  getCatalogs,
  createCatalog,
  updateCatalog,
  deleteCatalog,
} from "../../services/catalogService";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import classes from "./CatalogTable.module.css";
import { Catalog } from "../../types/catalog.type";

interface CatalogTableProps {
  onOpenModal: (catalog: Catalog) => void;
}

const CatalogTable = ({ onOpenModal }: CatalogTableProps) => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const fetchCatalogs = async () => {
    try {
      const response = await getCatalogs();
      setCatalogs(response.data);
    } catch (error) {
      console.error("Error fetching catalogs:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this catalog?")) {
        try {
            await deleteCatalog(id);
            console.log('Catalog deleted successfully');
            fetchCatalogs();
          } catch (error) {
            console.error('Error deleting catalog:', error);
          }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Vertical</TableCell>
            <TableCell>Primary</TableCell>
            <TableCell>Locales</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {catalogs.map((catalog) => (
            <TableRow key={catalog.name}>
              <TableCell>{catalog.name}</TableCell>
              <TableCell>{catalog.vertical}</TableCell>
              <TableCell>{catalog.primary ? "Yes" : "No"}</TableCell>
              <TableCell>{catalog.locales.join(", ")}</TableCell>
              <TableCell>
                <Button onClick={() => onOpenModal(catalog)}>Edit</Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(catalog._id!)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CatalogTable;
