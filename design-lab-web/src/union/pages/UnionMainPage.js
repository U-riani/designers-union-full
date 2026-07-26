import React from "react";
import { Container } from "react-bootstrap";
// import HeroBanner from '../../components/HeroBanner'
import ProjectsComponent from "../../components/ProjectsComponent";
// import NewsComponent from "../../components/NewsComponent";
import NewsComponent3 from "../../components/NewsComponent3";
// import PartnersComponent from '../../components/PartnersComponent'
// import SpaceComponent from "../../components/SpaceComponent";
import { LastNewsProvider } from "../../context/LastNewsContext";
import AboutUsComponent from "../../components/AboutUsComponent";
// import { useTranslation } from "react-i18next";

const UnionMainPage = () => {
  // const {t} = useTranslation()
  return (
    <Container fluid className="px-0 mb-0">
      {/* <HeroBanner /> */}
      {/* <SpaceComponent info={{h1: t('projects')}} /> */}
      <AboutUsComponent />
      <ProjectsComponent />
      {/* <SpaceComponent info={{ h1: t('news') }} /> */}
      {/* <NewsComponent /> */}
      <LastNewsProvider>
        <NewsComponent3 />
      </LastNewsProvider>
      {/* <PartnersComponent /> */}
    </Container>
  );
};

export default UnionMainPage;
