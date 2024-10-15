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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GENERAL } from "../../constants/general";
import { CatalogTableHeaderStyles } from "../../styles/catalogStyles";

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
    <TableContainer className={classes.table_container} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={CatalogTableHeaderStyles}>Name</TableCell>
            <TableCell sx={CatalogTableHeaderStyles}>Vertical</TableCell>
            <TableCell sx={CatalogTableHeaderStyles}>Primary</TableCell>
            <TableCell sx={CatalogTableHeaderStyles}>Locales</TableCell>
            <TableCell sx={CatalogTableHeaderStyles}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {catalogs.map((catalog: Catalog) => (
            <TableRow
              sx={{
                "&:hover": {
                  backgroundColor: "#fafafa",
                },
              }}
              key={catalog.name}
            >
              <TableCell>{catalog.name}</TableCell>
              <TableCell>{catalog.vertical}</TableCell>
              <TableCell>
                {catalog.primary ? GENERAL.YES : GENERAL.NO}
              </TableCell>
              <TableCell>{catalog.locales.join(", ")}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => onOpenModal(catalog)}
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CatalogTable;
