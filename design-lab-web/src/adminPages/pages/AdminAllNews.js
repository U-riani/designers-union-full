import React, { useEffect } from "react";
import he from "he";

import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetAllNewsQuery } from "../../data/newsSlice2";
import { useTranslation } from "react-i18next";

const UpdateNews = () => {
  const { data: allNews, isLoading, error, refetch } = useGetAllNewsQuery();
  const { i18n} = useTranslation()
  // const extractText = (html) => {
  //   console.log(html);
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(html, "text/html");
  //   return doc.body.textContent || "";
  // };
console.log(allNews)
  const extractTextRegex = (html) => {
    const textOnly = html.replace(/<[^>]*>/g, " ");
    // Decode HTML entities
    return he.decode(textOnly);
  };

  useEffect(() => {
    refetch()
  }, [refetch]);

  if (isLoading) {
    return (
      <Container className="getNewsComponent text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="getNewsComponent">
        <Alert variant="danger">Error fetching news: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="newsPage">
      <Row className="newsPage-row newsPage-row-1">
        {allNews &&
          allNews.map((el, i) => (
            <Col
              xs={12}
              // lg={6}
              key={i}
              className={`py-3 px-md-4 py-md-4 my-3 my-md-4 my-lg-5 newsPage-col newsPage-col-${i + 1}`}
            >
              {/* <div className="newsPage-title-container">
                <h5>{el.title || "News Title"}</h5>
              </div> */}
              <div
                className={`newsPage-col-inner-container newsPage-col-inner-container-${
                  i + 1
                } mb-0`}
              >
                <div
                  className={`newspage-text-image-container newspage-text-image-container-${
                    i + 1
                  } mb-0`}
                >
                  {/* Text container */}
                  <Col
                    xs={6}
                    sm={7}
                    md={5}
                    className={`newsPage-news-text-container newsPage-news-text-container-${
                      i + 1
                    } pe-3 mb-0`}
                  >
                    <div className="overflow-hidden">
                      <h5>{el.title[i18n.language]}</h5>
                      <div>{extractTextRegex(el.text[i18n.language])}</div>
                      {/* {console.log(...extractText(el.text))} */}
                      {/* {el.text.map((el) => ())} */}
                      {/* <p className="mb-0">{extractText(el.text)}</p> */}
                    </div>

                    <Button
                      as={Link}
                      to={`${el._id}`}
                      className=" rounded-0 bg-dark border-0 newsPage-button"
                    >
                      more
                    </Button>
                  </Col>

                  {/* Image container */}
                  <Col
                    xs={6}
                    sm={5}
                    md={6}
                    className={`newsPage-image-container newsPage-image-container-${
                      i + 1
                    } mb-0`}
                  >
                    <img src={el.images[0]} alt="news" />
                  </Col>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default UpdateNews;
