import React from "react";
import { Container, Row } from "react-bootstrap";
// import MapComponent from "../../components/MapComponent";
import SpaceComponent from "../../components/SpaceComponent";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="mx-0 px-0 contact-page">
      <SpaceComponent info={{ h1: t("contact") }} className="w-100" />
      <Row className="contact-page-row-1 pt-4 pt-lg-5">
        {/* <VisitBookForm /> */}
        <div className="contact-info-container py-3 py-lg-4  px-2  mt-lg-0">
          <div className="contact-info-tel mb-3">
            {/* <h5>
             
            </h5> */}
            <p>
              <FontAwesomeIcon icon={faPhone} /> +995 599 64 06 41
            </p>
          </div>
          <div className="contact-info-email mb-3">
            {/* <h5>
              
            </h5> */}
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> info@design-lab.ge
            </p>
          </div>
          <div className="contact-info-address">
            {/* <h5>
              
            </h5> */}
            <p className="mb-0 text-center">
              <FontAwesomeIcon icon={faMapLocationDot} /> {t("tbilisiGeorgia")}
            </p>
            <p className="mb-0 text-center">{t("AnaPolitkovskaia")}</p>
          </div>
        </div>
      </Row>
      <Row className="pt-4 pt-lg-5 contact-page-map-row">
        {/* <MapComponent /> */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d454.76269708922774!2d44.7144365946987!3d41.72261271561218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4044736319db2c11%3A0x9474f44820609643!2sDesign-Lab!5e0!3m2!1sen!2sge!4v1737634864350!5m2!1sen!2sge"
          width="600"
          height="450"
          style={{"border":"0"}}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Row>
    </Container>
  );
};

export default ContactPage;
