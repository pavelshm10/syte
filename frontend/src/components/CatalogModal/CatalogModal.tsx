import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Catalog } from "../../types/catalog.type";
import { catalogSchema } from "../../validation/catalogSchema";
// import { Document, Types } from "mongoose";

interface CatalogModalProps {
  open: boolean;
  handleClose: () => void;
  catalog: Catalog | null;
  handleSubmit: (values: Catalog) => void;
}

const verticalOptions = ["fashion", "home", "general"];
const localeOptions = ["en_us", "en_ca", "es_es"];

const CatalogModal = ({
  open,
  handleClose,
  catalog,
  handleSubmit,
}: CatalogModalProps) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Formik
          initialValues={{
            _id: catalog?._id || null,
            name: catalog?.name || "",
            vertical: catalog?.vertical,
            primary: catalog?.primary || false,
            locales: catalog?.locales || [],
          }}
          validationSchema={catalogSchema}
          onSubmit={(values: Catalog, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
            handleClose();
          }}
          enableReinitialize
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              <TextField
                fullWidth
                margin="normal"
                id="name"
                name="name"
                label="Catalog Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={
                  touched.name && errors.name
                    ? errors.name
                    : "Enter a unique name"
                }
              />

              <FormControl
                fullWidth
                margin="normal"
                error={touched.vertical && Boolean(errors.vertical)}
              >
                <InputLabel id="vertical-label">Vertical</InputLabel>
                <Select
                  labelId="vertical-label"
                  id="vertical"
                  name="vertical"
                  value={values.vertical}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Vertical"
                >
                  {verticalOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.vertical && errors.vertical
                    ? errors.vertical
                    : "Select a vertical"}
                </FormHelperText>
              </FormControl>

              <FormControl
                fullWidth
                margin="normal"
                error={touched.locales && Boolean(errors.locales)}
              >
                <InputLabel id="locales-label">Locales</InputLabel>
                <Select
                  labelId="locales-label"
                  id="locales"
                  name="locales"
                  value={values.locales}
                  onChange={handleChange}
                  //   value={catalog.locales.join(", ")}
                  //   onChange={(e) => {
                  //     const values = e.target.value
                  //       .split(",")
                  //       .map((locale) => locale.trim());
                  //     setFieldValue("locales", values);
                  //   }}
                  onBlur={handleBlur}
                  label="Locales"
                  multiple
                >
                  {localeOptions.map((locale) => (
                    <MenuItem key={locale} value={locale}>
                      {locale}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.locales && errors.locales
                    ? errors.locales
                    : "Select locales"}
                </FormHelperText>
              </FormControl>

              <Button type="submit" variant="contained" color="primary">
                {catalog ? "Update Catalog" : "Add Catalog"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default CatalogModal;
