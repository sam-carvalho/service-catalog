import React, { useState } from "react";
import {
  Dialog,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  OutlinedInput,
  InputAdornment,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Service } from "../../interfaces";
import { Search } from "@mui/icons-material";
import usePinnedServices from "../../hooks/usePinnedServices";
import { usePinned, useService } from "../../context";

interface PinnedDialogProps {
  isDialogOpen: boolean;
  handleDialogClose: () => void;
}

const PinnedDialog = ({
  isDialogOpen,
  handleDialogClose,
}: PinnedDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { services } = useService();
  const { updatePinnedStatus } = usePinnedServices();
  const { pinnedServices, setPinnedServices } = usePinned();
  const [selectedServices, setSelectedServices] =
    useState<Service[]>(pinnedServices);

  const handleServiceSelect = (service: Service) => {
    if (selectedServices.some((s) => s.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updatePinnedStatus(selectedServices ? selectedServices : []);
    setPinnedServices(selectedServices ? selectedServices : []);
    setSelectedServices([]);
    handleDialogClose();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleDialogClose}
      data-testid="pinned-services-dialog"
    >
      <DialogTitle fontSize={16}>Edit pinned services</DialogTitle>
      <DialogContent dividers>
        <DialogContentText sx={{ paddingBottom: 2 }}>
          Select the services you want to show in the pinned section
        </DialogContentText>
        <OutlinedInput
          id="filter-services"
          startAdornment={
            <InputAdornment position="start" sx={{ paddingLeft: 1 }}>
              <Search />
            </InputAdornment>
          }
          placeholder="Filter services"
          value={searchTerm}
          onChange={handleSearch}
          size="small"
          fullWidth
          sx={{ paddingLeft: 0 }}
        />
        <form onSubmit={handleSave} style={{ margin: 5, paddingTop: 5 }}>
          <FormGroup>
            {Array.isArray(services) &&
              services
                .filter((service) =>
                  service.name
                    .toLowerCase()
                    .startsWith(searchTerm.toLowerCase())
                )
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((service: Service) => (
                  <FormControlLabel
                    key={service.id}
                    control={
                      <Checkbox
                        checked={selectedServices.some(
                          (s) => s.id === service.id
                        )}
                        onChange={() => handleServiceSelect(service)}
                        size="small"
                        style={{ padding: 5, marginLeft: 2 }}
                      />
                    }
                    label={service.name}
                  />
                ))}
          </FormGroup>
          <DialogActions sx={{ padding: 0, margin: 0 }}>
            <Button type="submit" variant="contained" size="small">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PinnedDialog;
