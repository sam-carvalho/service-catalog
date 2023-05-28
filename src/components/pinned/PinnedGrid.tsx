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
import { usePinned } from "../../context";

const PinnedGrid = () => {
  const { pinnedServices } = usePinned();

  return (
    <>
      {pinnedServices.length > 0 && (
        <Box>
          <h4>Pinned</h4>
          <Grid container spacing={2}>
            {pinnedServices.map((service: Service) => (
              <Grid item key={service.id}>
                <Card
                  sx={{
                    minWidth: 100,
                    maxWidth: 180,
                    maxHeight: 180,
                    margin: 0,
                  }}
                >
                  <CardActionArea href={service.url}>
                    <CardMedia
                      component="img"
                      height="130"
                      image={service.logo}
                      alt={service.name}
                    />
                    <CardContent sx={{ display: "flex", padding: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ margin: "auto", textAlign: "center" }}
                      >
                        {service.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
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
