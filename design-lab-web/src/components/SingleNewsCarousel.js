import React from "react";
import { Container, Carousel } from "react-bootstrap";

const SingleNewsCarousel = ({ data }) => {
  // const imagesData = [data, data];
  // console.log('SingleNewsCarousel', data)
  return (
    <Container className="mb-0 single-news-page-carousel-container" fluid>
      <Carousel
        className=""
        autoPlay={true}
        touch={true}
      >
        {data &&
          data.map((el, i) => (
            <Carousel.Item key={i} className="">
              <div
                className=""
              >
                <div className="single-news-carousel-image-container ">
                  <img className="carousel-image " src={el} alt="" />
                </div>
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </Container>
  );
};

export default SingleNewsCarousel;
