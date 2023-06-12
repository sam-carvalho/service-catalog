import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";
import { useCategory, useService, useSearch } from "../../context";

const ServicesGrid = () => {
  const { categories } = useCategory();
  const { services } = useService();
  const { searchQuery } = useSearch();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const filteredServices = services.filter((service) =>
        service.name
          .toLowerCase()
          .replace(/-/g, "")
          .includes(searchQuery.toLowerCase().replace(/-/g, ""))
      );
      setSearchResults(filteredServices);
    } else {
      setSearchResults(services);
    }
  }, [searchQuery, services]);

  const groupedServices = Array.isArray(categories)
    ? categories.map((category) => ({
        category,
        services: searchResults.filter(
          (service) => service.categoryId === category.id
        ),
      }))
    : [];

  return (
    <>
      {searchQuery && searchResults.length === 0 && <div>No results found</div>}

      {(!searchQuery || searchResults.length > 0) &&
        groupedServices
          .filter((group) => group.services.length > 0)
          .map((group) => (
            <div key={group.category.id}>
              <h4>{group.category.name}</h4>
              <Grid container spacing={2.5}>
                {group.services.map((service) => (
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

                        <CardContent sx={{ display: "flex", padding: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              margin: "auto",
                              textAlign: "center",
                            }}
                          >
                            {service.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
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
