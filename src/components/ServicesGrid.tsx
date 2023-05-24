import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";
import useCategories from "../hooks/useCategories";
import useServices from "../hooks/useServices";
import { usePinServices } from "../context/PinnedServices/PinnedServicesProvider";
import PinnedGrid from "./pinned/PinnedGrid";

const ServicesGrid = () => {
  const { categories, fetchCategories } = useCategories();
  const { services } = useServices();
  const { pinnedServices } = usePinServices();

  const groupedServices = categories.map((category) => ({
    category,
    services: services.filter((service) => service.categoryId === category.id),
  }));

  return (
    <>
      <PinnedGrid pinnedServices={pinnedServices} />
      {groupedServices
        .filter((group) => group.services.length > 0)
        .map((group) => (
          <div key={group.category.id}>
            <h4>{group.category.name}</h4>
            <Grid container spacing={2.5}>
              {group.services.map((service) => (
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
          </div>
        ))}
    </>
  );
};

export default ServicesGrid;
