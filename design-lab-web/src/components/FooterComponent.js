import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import {
  faMapLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const FooterComponent = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className="footer mb-0 py-5">
      <Row className="mb-0 pt-0 footer-row-1">
        {/* <Col sm={3}>Logo</Col> */}

        <div className="footer-contact-info-container p-4 p-md-0 pb-md-4  mtmd-0">
          <Col sm={12} lg={12} className="footer-follow-us-col">
            <div className="footer-contact-info-follow-us">
              <div>
                <h2 className="text-center mb-0 pb-4 fw-bold">
                  {t("followUs")}
                </h2>
              </div>
              <div className="w-100 footer-icons-container d-flex flex-row justify-content-center pb-4">
                <a
                  href="https://www.facebook.com/designlab2022"
                  target="_blank"
                  rel="noopener noreferrer"
                  
                >
                  <div>
                    <FontAwesomeIcon
                      icon={faFacebookF}
                      className="icon-size"
                      size="2x"
                    />
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/designlab.ge/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="icon-size"
                      size="2x"
                    />
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/company/georgian-union-of-designers-%E1%83%A1%E1%83%90%E1%83%A5%E1%83%90%E1%83%A0%E1%83%97%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%A1-%E1%83%93%E1%83%98%E1%83%96%E1%83%90%E1%83%98%E1%83%9C%E1%83%94%E1%83%A0%E1%83%97%E1%83%90-%E1%83%92%E1%83%90%E1%83%94%E1%83%A0%E1%83%97%E1%83%98%E1%83%90%E1%83%9C%E1%83%94%E1%83%91%E1%83%90/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <FontAwesomeIcon
                      icon={faLinkedinIn}
                      className="icon-size"
                      size="2x"
                    />
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/@designlab328"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <FontAwesomeIcon
                      icon={faYoutube}
                      className="icon-size"
                      size="2x"
                    />
                  </div>
                </a>
              </div>
            </div>
          </Col>
          <Col sm={12} lg={4} className="footer-address-col mb-4 mb-lg-0">
            <div className="footer-contact-info-address footer-button">
              {/* <h5><FontAwesomeIcon icon={faMapLocationDot} /> {t("address")}</h5> */}
              {/* <h5><FontAwesomeIcon icon={faMapLocationDot} /> </h5> */}
              <a
                href="https://maps.app.goo.gl/1WKCoqcj1YiYX2mX8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark footer-contact-info-button"
              >
                <p className="mb-0 text-center">
                  <FontAwesomeIcon icon={faMapLocationDot} />{" "}
                  {t("tbilisiGeorgia")}
                </p>
                <p className="mb-0 text-center">{t("AnaPolitkovskaia")}</p>
              </a>
            </div>
          </Col>
          <Col
            sm={12}
            lg={4}
            className="footer-tel-mail-col footer-tel-col mb-4 mb-lg-0"
          >
            <div className="footer-contact-info-email">
              <div className="footer-contact-info-tel mb-0">
                {/* <h5><FontAwesomeIcon icon={faPhone} /> {t("tel")}</h5> */}
                <a
                  className=" footer-button mb-0footer-contact-info-button"
                  href="https://wa.me/995599640641?text=Hello%20there!"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  <FontAwesomeIcon icon={faPhone} /> +995 599 64 06 41
                </a>
              </div>
            </div>
          </Col>
          <Col
            sm={12}
            lg={4}
            className="footer-tel-mail-col footer-mail-col mb-0 mb-lg-0"
          >
            <div>
              {/* <h5><FontAwesomeIcon icon={faEnvelope} /> {t("email")}</h5> */}
              <a
                className="footer-button footer-contact-info-button"
                href="mailto:info@design-lab.ge?subject=Inquiry&body=Hello,%20I%20would%20like%20to%20learn%20more%20about%20your%20services."
              >
                <FontAwesomeIcon icon={faEnvelope} /> info@design-lab.ge
              </a>
            </div>
          </Col>
        </div>
      </Row>
      <Row className="mb-0">
        <p className="fs-6 mb-0 text-center">
          Created By © <span className="fw-bold">DESIGN-LAB.GE</span>
        </p>
      </Row>
    </Container>
  );
};

export default FooterComponent;
