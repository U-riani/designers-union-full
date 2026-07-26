import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
// import { Link } from "react-router-dom";
// const slide1 = require("../images/union/hero-banner/slide3-b.jpg");
import HeroBannerCarousel from "./HeroBannerCarousel";
import { useGetAllHerosQuery } from "../data/heroSlice";
import { useLocalStorage } from "../context/LocalStorageContext";

const HeroBanner = () => {
  const { data: allHeros } = useGetAllHerosQuery();
  const { localStorageData, updateLocalStorageData } = useLocalStorage();
  const localHeroData = localStorageData.allHeros;

  // Helper function to compare news data arrays
  const isDataDifferent = (localData, serverData) => {
    if (!localData || localData.length !== serverData.length) return true;
    return JSON.stringify(localData) !== JSON.stringify(serverData);
  };

  // Load data from server and update localStorage if data has changed
  useEffect(() => {
    if (allHeros && isDataDifferent(localHeroData, allHeros)) {
      updateLocalStorageData("allHeros", allHeros);
    }
  }, [allHeros,localHeroData]);

  // console.log("hero banner data", allHeros);
  return (
    <Container fluid className="hero-banner px-0 ">
      {localHeroData && <HeroBannerCarousel data={localHeroData} />}
    </Container>
  );
};

export default HeroBanner;
