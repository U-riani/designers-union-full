import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../context/LocalStorageContext";
import { useGetAboutUsMainPageQuery } from "../data/aboutUsSlice";

const AboutUsComponent = () => {
  const { t, i18n } = useTranslation();

  const { data } = useGetAboutUsMainPageQuery();
  const { localStorageData, updateLocalStorageData } = useLocalStorage();
  const localAboutUsData = localStorageData.aboutUsMainPage;

  // console.log(localAboutUsData);

  // Helper function to compare news data arrays
  const isDataDifferent = (localData, serverData) => {
    if (!localData || localData.length !== serverData.length) return true;
    return JSON.stringify(localData) !== JSON.stringify(serverData);
  };

  // Load data from server and update localStorage if data has changed
  useEffect(() => {
    if (data && isDataDifferent(localAboutUsData, data)) {
      updateLocalStorageData("aboutUsMainPage", data);
    }
  }, [data, localAboutUsData]);

  return (
    <Container
      fluid
      className="px-0 aboutUs-component d-flex flex-column align-items-center justify-content-start"
    >
      {/* <SpaceComponent info={{ h1: t("aboutUs") }} className="w-100" /> */}
      <Row className="aboutUs-component-inner-container mx-0 my-3 my-md-5 py-3 py-md-4  px-3 mb-5">
        <Col
          sm={12}
          lg={6}
          className="aboutUs-component-col-1 d-flex  flex-column justify-content-start align-items-start"
        >
          {" "}
          <h3 className="aboutUs-component-title pb-2 pb-lg-3">
            {t("aboutUs")}
          </h3>
          {localAboutUsData && (
            <p className="mb-0">{localAboutUsData[0]?.text[i18n.language]}</p>
          )}
          <div className="newsComponent-see-more-button-col overflow-hidden d-flex align-self-end  me-auto my-4 mb-lg-0 mt-xl-auto pb-lg-0">
            <button className="see-more">
              <Link className="see-more-link px-3 py-2 py-sm-3" to="/aboutUs">
                <span className="pt-1">{t("more")}</span>
                <em></em>
              </Link>
            </button>
          </div>
        </Col>
        <Col sm={12} lg={6}>
          {localAboutUsData && (
            <img
              src={localAboutUsData[0]?.image[0]}
              className="aboutUs-component-img"
              alt=" "
            />
          )}
          {/* <img src="aboutUs-1.jpg" className="aboutUs-component-img" alt=" " /> */}
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsComponent;
