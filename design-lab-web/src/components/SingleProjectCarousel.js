import Carousel from "react-bootstrap/Carousel";

function SingleProjectCarousel({ data }) {
  // console.log('SingleProjectCarousel',data)
  return (
    <Carousel className="w-100">
      {data &&
        data.map((item, i) => (
          <Carousel.Item key={i} className="singleProjectCarousel">
            <img src={item.url} alt=" carousel "/>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default SingleProjectCarousel;
