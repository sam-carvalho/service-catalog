import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Box,
} from "@mui/material";
import { Service } from "../../interfaces";
import { usePinned, useSearch } from "../../context";

const PinnedGrid = () => {
  const { pinnedServices } = usePinned();
  const { searchQuery } = useSearch();

  return (
    <>
      {!searchQuery && pinnedServices.length > 0 && (
        <Box>
          <h4>Pinned</h4>
          <Grid container spacing={2}>
            {pinnedServices.map((service: Service) => (
              <Grid item key={service.id}>
                <Card
                  sx={{
                    minWidth: "fit-content",
                    maxWidth: 160,
                    maxHeight: 200,
                    margin: 0,
                    padding: 1,
                  }}
                >
                  <CardActionArea href={service.url}>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={service.logo}
                      alt={service.name}
                    />
                  </CardActionArea>
                  <CardContent sx={{ display: "flex", padding: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{ margin: "auto", textAlign: "center" }}
                    >
                      {service.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default PinnedGrid;
