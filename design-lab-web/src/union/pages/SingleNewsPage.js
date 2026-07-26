import React from "react";
import { Spinner, Alert, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetSingleNewsQuery } from "../../data/newsSlice2";
import { useTranslation } from "react-i18next";
import SingleNewsCarousel from "../../components/SingleNewsCarousel";

const GetSingleNews = () => {
  const { newsId } = useParams();
  const { i18n } = useTranslation();

  const { data: news, error, isLoading } = useGetSingleNewsQuery(newsId);
  // console.log(news);

  if (isLoading) {
    return (
      <Container className="singleNewsComponent text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="singleNewsComponent">
        <Alert variant="danger">Error fetching news: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container className="singleNewsComponent my-0 py-4 py-md-5 d-flex align-items-center justify-content-center">
      <Row className="single-news-component-inner-container mb-0 ">
        {news?.length === 0 ? (
          <p>No news articles available.</p>
        ) : (
          <div className="news-article px-3 pb-3">
            {/* <Row>
            <h1 className="text-center mb-0 pt-3">{ news.title[i18n.language] || news.title}</h1>
          </Row> */}

            {/* <img src={news.image} alt={news.title} className="img-fluid" /> */}
            <Row className="single-news-image-row pt-3 px-0 px-lg-3 mb-1 mb-lg-4">
              <SingleNewsCarousel data={news.images} />
              {/* {news.image && <img src={news.image} alt="news" />} */}
            </Row>
            <Row className="pt-4">
              <h3 className="text-center">{news.title[i18n.language]}</h3>
            </Row>
            <Row
              className="article-body pt-5"
              dangerouslySetInnerHTML={{
                __html: news.text[i18n.language] || news.text,
              }}
            />
            {/* <div className="article-body" dangerouslySetInnerHTML={{ __html: userLanguage === 'en' ? news.textEn : news.textGe }} /> */}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default GetSingleNews;
