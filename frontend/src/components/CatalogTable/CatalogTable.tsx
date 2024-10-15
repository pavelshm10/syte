import React, { useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { deleteCatalogThunk } from "../../store/catalog/catalogThunk";

interface CatalogTableProps {
  onOpenModal: (catalog: Catalog) => void;
}

const CatalogTable = ({ onOpenModal }: CatalogTableProps) => {
  const dispatch = useAppDispatch();
  const catalogs = useAppSelector((state) => state.catalogs.catalogs);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this catalog?")) {
      dispatch(deleteCatalogThunk(id));
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
          {catalogs.map((catalog: Catalog) => (
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
