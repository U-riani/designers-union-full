import React, { useState, Suspense, lazy } from "react";
import { Spinner, Alert, Container, Row, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSingleNewsQuery,
  useDeleteNewsMutation,
} from "../../data/newsSlice2";
import { useTranslation } from "react-i18next";
import SingleNewsCarousel from "../../components/SingleNewsCarousel.js";

// Lazy load JoditUpdateEditor component
const JoditUpdateEditor = lazy(() => import("../components/JoditUpdateEditor"));

const AdminSingleNews = () => {
  const { newsId } = useParams();
  const { data: news, isLoading, error } = useGetSingleNewsQuery(newsId);
  const { i18n } = useTranslation();
  const [deleteNews] = useDeleteNewsMutation();
  const navigate = useNavigate();
  const [showEditor, setShowEditor] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  console.log(news);

  const handleDelete = async (id) => {
    try {
      await deleteNews(id).unwrap();
      console.log("News deleted successfully");
      navigate("/admin/all-news");
    } catch (error) {
      console.error("Failed to delete news:", error);
    }
  };

  const confirmDelete = () => {
    handleDelete(newsId);
    setShowAlert(false);
  };

  const cancelDelete = () => {
    setShowAlert(false);
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
    <Container className="singleNewsComponent">
      {!news ? (
        <p>No news articles available.</p>
      ) : (
        <div className="news-article  mb-4 px-3">
          <Row className="single-news-image-row pt-3 px-0 px-lg-3 mb-1 mb-lg-4">
            <SingleNewsCarousel data={news.images} />
          </Row>
          <Row
            className="article-body admin-singlenews-article-body pb-5 pt-5"
            dangerouslySetInnerHTML={{
              __html: news.text[i18n.language] || news.text,
            }}
          />
          {showEditor && (
            <Row className="d-flex justify-content-center">
              {/* Suspense with a fallback UI for the lazy-loaded editor */}
              <Suspense
                fallback={<Spinner animation="border" variant="primary" />}
              >
                <JoditUpdateEditor parentComponent={"news"} data={news} />
              </Suspense>
            </Row>
          )}
          <Row>
            <div className="admin-buttons-container d-flex justify-content-around my-4">
              <Button
                onClick={() => setShowEditor(true)}
                className="text-dark rounded-0 bg-info border-0"
              >
                UPDATE
              </Button>
              <Button
                className="text-light rounded-0 bg-danger border-0"
                onClick={() => setShowAlert(true)}
              >
                DELETE
              </Button>
            </div>
          </Row>
          {showAlert && (
            <Alert variant="warning" className="mt-3">
              <Alert.Heading>Are you sure?</Alert.Heading>
              <p>
                This action cannot be undone. Please confirm if you want to
                proceed.
              </p>
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  onClick={cancelDelete}
                  className="me-2"
                >
                  Cancel
                </Button>
                <Button variant="danger" onClick={confirmDelete}>
                  Confirm
                </Button>
              </div>
            </Alert>
          )}
        </div>
      )}
    </Container>
  );
};

export default AdminSingleNews;
