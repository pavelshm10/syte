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
  IconButton,
} from "@mui/material";
import classes from "./CatalogTable.module.css";
import { Catalog } from "../../types/catalog.type";
import { useAppDispatch } from "../../store/hooks/useRedux";
import { deleteCatalogThunk } from "../../store/catalog/catalogThunk";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GENERAL } from "../../constants/general";

interface CatalogTableProps {
  onOpenModal: (catalog: Catalog) => void;
  catalogs: Catalog[];
}

const CatalogTable = ({ onOpenModal, catalogs }: CatalogTableProps) => {
  const dispatch = useAppDispatch();

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
              <TableCell>{catalog.primary ? GENERAL.YES : GENERAL.NO}</TableCell>
              <TableCell>{catalog.locales.join(", ")}</TableCell>
              <IconButton
                onClick={() =>  onOpenModal(catalog)}
                aria-label="edit catalog"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDelete(catalog._id!)}
                aria-label="delete catalog"
              >
                <DeleteIcon />
              </IconButton>
              {/* <TableCell>
                <Button onClick={() => onOpenModal(catalog)}>Edit</Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(catalog._id!)}>
                  Delete
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CatalogTable;
