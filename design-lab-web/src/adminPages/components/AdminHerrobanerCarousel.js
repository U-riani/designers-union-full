import React from "react";
import { Container, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const AdminHeroBannerCarousel = ({ data }) => {
  const {t, i18n} = useTranslation()
console.log(data)
  return (
    <Container className="carousel-container px-0" fluid>
      <Carousel
        className="h-100 hero-banner-carousel"
        autoPlay={true}
        touch={true}
      >
        {data &&
          data.map((el, i) => (
            <Carousel.Item key={i} className="bg-dark">
              <Link
                to="/somewhere"
                className="carousel-item-inner-link-container"
              >
                <div className="carousel-image-container">
                  <img className="carousel-image" src={el.image.url} alt="" />
                </div>
                <Carousel.Caption className="px-2">
                  <p>
                    {/* {el.text ? el.text[i18n.language] : el.heroText[i18n.language]} */}
                  </p>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
      </Carousel>
    </Container>
  );
};

export default AdminHeroBannerCarousel;
