import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CarouselComponent from "./CarouselComponent";
import { useTranslation } from "react-i18next";
import { useGetAllPartnersQuery } from "../data/partnersSlice";
import { useLocalStorage } from "../context/LocalStorageContext";

const PartnersComponent = () => {
  const { data } = useGetAllPartnersQuery();
  const { localStorageData, updateLocalStorageData } = useLocalStorage();

  const localPartnersData = localStorageData.allPartners;

  // Helper function to compare news data arrays
  const isDataDifferent = (localData, serverData) => {
    if (!localData || localData.length !== serverData.length) return true;
    return JSON.stringify(localData) !== JSON.stringify(serverData);
  };

  useEffect(() => {
    if (data && isDataDifferent(localPartnersData, data)) {
      updateLocalStorageData("allPartners", data);
    }
  }, [data]);

  const { t } = useTranslation();

  // console.log("partners:", data);
  return (
    <Container fluid className="partnersComponent-container px-0 py-0 mb-0">
      <Row className="partnersComponent-inner-container px-0 mb-0">
        {/* <SpaceComponent info={{h1: t('partners')}}/> */}
        <Row className="partnersComponent-row-1 mb-0  px-2 py-5 mx-0">
          <Col
            xl={4}
            
            className="px-0 pb-4 pb-xl-0 partners-title-container mb-0"
          >
            <h2 className="align-left my-auto white-text pb-3 pb-xl-0">
              {t("partners")}
            </h2>
            <div className="partnersComponent-line mt-auto"></div>
          </Col>
          <Col
            xl={8}
            className="partnersComponent-carousel mb-0 pe-0 ps-0 pb-4 pb-sm-0"
          >
            <CarouselComponent partners={localPartnersData} />
          </Col>
        </Row>
      </Row>
      {/* <Row className="partnersComponent-row-2 pb-0 mb-0"></Row> */}
    </Container>
  );
};

export default PartnersComponent;
