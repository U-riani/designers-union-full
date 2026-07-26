import Carousel from "react-bootstrap/Carousel";

function SingleProjectsPageCarousel ({ data }) {
  // console.log('SingleProjectsPageCarousel',data)
  return (
    <Carousel className="w-100 single-project-page-carousel pb-1 mb-1">
      {data &&
        data.map((item, i) => (
          <Carousel.Item key={i} className="singleProjectCarousel">
            <img src={item.url} alt=" carousel"/>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default SingleProjectsPageCarousel;
