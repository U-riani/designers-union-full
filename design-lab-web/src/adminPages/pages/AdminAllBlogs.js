import React, { useEffect } from "react";
import he from "he";

import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetAllBlogsQuery } from "../../data/blogSlice";

const AdminAllBlogs = () => {
  const { data: allBlogs, isLoading, error, refetch } = useGetAllBlogsQuery();
  const { i18n } = useTranslation();
  const extractTextRegex = (html) => {
    const textOnly = html.replace(/<[^>]*>/g, " ");
    // Decode HTML entities
    return he.decode(textOnly);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const geMonths = [
    "იან",
    "თებ",
    "მარ",
    "აპრ",
    "მაი",
    "ივნ",
    "ივლ",
    "აგვ",
    "სექ",
    "ოქტ",
    "ნოე",
    "დეკ",
  ];
  const enMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month =
      i18n.language === "en"
        ? enMonths[date.getMonth()]
        : geMonths[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

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
        {allBlogs &&
          allBlogs.map((el, i) => (
            <Col xs={12} sm={6} lg={4} className="mb-4" key={i}>
              <Link
                to={`${el._id}`}
                className="card blogs-card rounded-0 border-0"
              >
                <div className="card-header m-0 p-0 border-0">
                  <img
                    src={el.images[0]}
                    className="card-img-top rounded-0 "
                    alt=""
                  />
                </div>
                <div className="card-body blogs-card-body">
                  <p className="blogs-date">{formatDate(el.date)}</p>
                  <div
                    className="blogs-text-container"
                  >
                    <h5
                      className="blogs-card-title card-title"
                      title={el.title[i18n.language]}
                    >
                      {el.title[i18n.language]}
                    </h5>
                    <p
                      className="blogs-card-text card-text"
                      title={extractTextRegex(el.text[i18n.language])}
                    >
                      {" "}
                      {extractTextRegex(el.text[i18n.language])}
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default AdminAllBlogs;
