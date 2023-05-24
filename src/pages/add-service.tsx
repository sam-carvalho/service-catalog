import React, { useState } from "react";
import { Box, Grid, TextField, Button, FormControl } from "@mui/material";
import SelectCategory from "../components/category/SelectCategory";
import useServices from "../hooks/useServices";
import { Category } from "../interfaces/category";

const AddService = () => {
  const { addService } = useServices();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [logoLocation, setLogoLocation] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{}>,
    category: Category | null
  ) => {
    setSelectedCategory(category);
    setSelectedCategoryId(category?.id || "");
  };

  const handleLogoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoLocation(e.target.value);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addService(name, url, logoLocation, selectedCategoryId);
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setUrl("");
    setLogoLocation("");
    setSelectedCategory(null);
    setSelectedCategoryId("");
  };

  const headingStyle = {
    margin: "0",
    display: "flex",
    justifyContent: "center",
    fontWeight: "400",
    fontSize: "30px",
    paddingBottom: "40px",
  };

  return (
    <Box border="0.5px solid #ccc" borderRadius={3} p={4} mt={4} maxWidth={672}>
      <h2 style={headingStyle}>Add Service</h2>
      <form onSubmit={handleSave}>
        <Grid container spacing={2} display="flex" alignItems="center">
          <Grid item xs={12} sm={4}>
            <label htmlFor="service-name">Service Name</label>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              id="service-name"
              name="service-name"
              variant="outlined"
              size="small"
              onChange={handleNameChange}
              value={name}
              placeholder="Service Name"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <label htmlFor="service-url">Service URL</label>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              id="service-url"
              name="service-url"
              variant="outlined"
              size="small"
              onChange={handleUrlChange}
              value={url}
              placeholder="Service URL"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <label htmlFor="service-logo">Service Logo</label>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              id="service-logo"
              name="service-logo"
              variant="outlined"
              size="small"
              onChange={handleLogoUrlChange}
              value={logoLocation}
              placeholder="Logo URL"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <label htmlFor="service-category">Service Category</label>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth>
              <SelectCategory
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setSelectedCategoryId={setSelectedCategoryId}
                handleCategoryChange={handleCategoryChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              mt={2}
            >
              <Button
                variant="outlined"
                style={{ marginRight: "10px" }}
                onClick={clearForm}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddService;
