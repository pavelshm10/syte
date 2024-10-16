import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import { CATALOGS } from "../../constants/catalogs";
import classes from "./Navbar.module.css";
import { AddCatalogButton } from "../../styles/catalogStyles";

interface NavbarProps {
  onAddCatalog: () => void;
  onSearchTerm: (searchTerm: string) => void;
  onMultiLocalChecked:(isMultiLocalChecked: boolean)=>void;
}

function Navbar({ onAddCatalog, onSearchTerm, onMultiLocalChecked }: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isMultiLocalFilter, setIsMultiLocalFilter] = useState(false);

  const onCahngeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchTerm(e.target.value);
  };

  const onMultiuLocalChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setIsMultiLocalFilter(e.target.checked);
    onMultiLocalChecked(e.target.checked);
  }

  return (
    <div className={classes.navbar}>
      <Button variant="outlined" sx={AddCatalogButton} onClick={onAddCatalog}>
        {CATALOGS.ADD_CATALOGS}
      </Button>
      <TextField
        label={CATALOGS.SEARCH_CATLOGS_BY_NAME}
        variant="standard"
        value={searchTerm}
        sx={{ margin: "auto", width: 200 }}
        onChange={onCahngeSearchTerm}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isMultiLocalFilter}
            onChange={onMultiuLocalChange}
          />
        }
        label={CATALOGS.SHOW_MULTI_LOCAL_ONLY}
      />
    </div>
  );
}

export default Navbar;
