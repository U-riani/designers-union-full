import React from "react";
import { Carousel } from "react-bootstrap";

const NewsCarouselComponent = ({ newsData }) => {
  return (
    <Carousel indicators={false} controls={true} className=" bg-light">
      {newsData &&
        newsData.map((el, i) => (
          <Carousel.Item  className="bg-info">
            <img className="newsComponent-carousel-img" src={el.imgSrc} alt="" />
          </Carousel.Item>
        ))}
      {/* <Carousel.Item interval={500} className="bg-light"></Carousel.Item>
      <Carousel.Item className="bg-dark"></Carousel.Item> */}
    </Carousel>
  );
};

export default NewsCarouselComponent;
