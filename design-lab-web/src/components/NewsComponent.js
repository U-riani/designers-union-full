// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// // import StackCardsSlider3 from "./StackCardsSlider3";
// import StackCardsSlider4 from "./StackCardsSlider4";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const NewsComponent = () => {
//   const newsData = useSelector((state) => state.news);
//   // const activeNews = newsData.filter((el) => el.activeNews === true);
//   // newsData.map((el) => {
//   //   console.log(el)
//   // })

//   return (
//     <Container fluid className="news-component py-5">
//       <Row className="newsComponent-row-1">
//         <h4>News</h4>
//       </Row>
//       <Row className="newsComponent-row-2 px-2">
//         <Col xs={3} sm={4} className="newsComponent-left-col pe-0 ps-0 mb-0">
//           <div className="newsComponent-carouse-text-container">
//             {newsData &&
//               newsData.map((el, i) => (
//                 <h4
//                   className={`ps-2 newsComponent-carouse-text ${
//                     el.activeNews ? "newsComponent-carouse-active-text" : ""
//                   }`}
//                   key={i}
//                 >
//                   {el.text}
//                 </h4>
//               ))}
//             {/* <h4>{activeNews && activeNews[0].text}</h4> */}
//           </div>

//           <div className="newsComponent-see-more-button-col mt-auto">
//             <button className="see-more">
//               <Link className="see-more-link px-3 py-2 py-sm-3" to="/news">
//                 <span>more</span>
//                 <em></em>
//               </Link>
//             </button>
//           </div>
//         </Col>
//         <Col xs={9} sm={8} className="newsComponent-carousel-container ps-0 mb-0">
//           {/* <StackCardsSlider3 newsData={newsData} /> */}
//           <StackCardsSlider4 newsData={newsData} />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default NewsComponent;
