import React, { useState } from "react";
import {
  Dialog,
  Button,
  Grid,
  TextField,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SelectCategory from "../category/SelectCategory";
import useServices from "../../hooks/useServices";
import { Category } from "../../interfaces";
import { useService } from "../../context";
import { fetchServices } from "../../services";

interface ServiceDialogProps {
  isDialogOpen: boolean;
  handleDialogClose: () => void;
}

const ServiceDialog = ({
  isDialogOpen,
  handleDialogClose,
}: ServiceDialogProps) => {
  const { addService } = useServices();
  const { setServices } = useService();
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
    await addService({
      name,
      url,
      logo: logoLocation,
      categoryId: selectedCategoryId,
      isPinned: "false",
    });
    handleDialogClose();
    clearForm();

    const updatedServices = await fetchServices();
    setServices(updatedServices);
  };

  const clearForm = () => {
    setName("");
    setUrl("");
    setLogoLocation("");
    setSelectedCategory(null);
    setSelectedCategoryId("");
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleDialogClose}
      data-testid="add-services-dialog"
    >
      <DialogTitle fontSize={16}>Add Service</DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSave} style={{ margin: 5, paddingTop: 5 }}>
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
          </Grid>
          <DialogActions sx={{ padding: 0, marginTop: 2 }}>
            <Button type="submit" variant="contained" size="small">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;
