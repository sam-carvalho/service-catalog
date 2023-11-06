import React from "react";
import ServicesGrid from "../components/service/ServicesGrid";
import PinnedGrid from "../components/pinned/PinnedGrid";

const Home = () => {
  return (
    <>
      <PinnedGrid />
      <ServicesGrid />
    </>
  );
};

export default Home;
