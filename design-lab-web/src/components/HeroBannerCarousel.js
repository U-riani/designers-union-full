import React from "react";
import { Container, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeroBannerCarousel = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Container className="carousel-container px-0" fluid>
      <Carousel
        className="h-100 hero-banner-carousel"
        autoPlay={true}
        touch={true}
        controls={true}
      >
        {data &&
          data.map((el, i) => (
            <Carousel.Item key={i} className="bg-dark py-0 my-0">
              <div
                to="/registration"
                className="carousel-item-inner-link-container py-0"
              >
                <div className="carousel-image-container">
                  <img className="carousel-image" src={el.image[0]} alt="" />
                </div>
                <Carousel.Caption className="px-2 px-lg-4 py-2 py-md-3 pt-lg-2 pb-lg-4 d-flex flex-column justify-content-between align-items-center">
                  {/* <p>
                    {el.text ? el.text[i18n.language] : el.heroText[i18n.language]}
                  </p> */}
                  <p className="mb-2 align-items-center px-3">
                    {t("becomeMember")}
                  </p>
                  <button className="heroBanner-registration-button p-0">
                    <Link to="/registration" className="px-3 px-lg-5 py-2">{t("registration")}</Link>
                  </button>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </Container>
  );
};

export default HeroBannerCarousel;
