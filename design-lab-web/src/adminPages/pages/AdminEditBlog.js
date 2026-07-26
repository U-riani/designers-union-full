import React, { useState, Suspense, lazy } from "react";
import { Spinner, Alert, Container, Row, Button, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useDeleteBlogsMutation,
  useGetSingleBlogsQuery,
} from "../../data/blogSlice.js";

// Lazy load JoditUpdateEditor component
const JoditUpdateEditor = lazy(() => import("../components/JoditUpdateEditor"));

const AdminEditBlog = () => {
  const { blogId } = useParams();
  const { data: blog, isLoading, error } = useGetSingleBlogsQuery(blogId);
  const { i18n } = useTranslation();
  const [deleteBlog] = useDeleteBlogsMutation();
  const navigate = useNavigate();
  const [showEditor, setShowEditor] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id).unwrap();
      console.log("Blog deleted successfully");
      navigate("/admin/all-blogs");
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  const confirmDelete = () => {
    handleDelete(blogId);
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
        <Alert variant="danger">Error fetching blog: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container className="singleNewsComponent">
      {!blog ? (
        <p>No blog articles available.</p>
      ) : (
        <div className="news-article  mb-4 px-3">
          <Row className="newsPage-row newsPage-row-2 px-md-4 mt-3 mt-md-4 mt-lg-5 text-center">
            <h2>{blog.title[i18n.language]}</h2>
          </Row>
          <Row>
            <Col sm={12} className="d-flex align-center justify-content-center">
                      <img src={blog.images[0]} alt="" className="single-blog-main-image" />
                    </Col>
          </Row>
          <Row
            className="article-body admin-singlenews-article-body pb-5 pt-5"
            dangerouslySetInnerHTML={{
              __html: blog.text[i18n.language],
            }}
          />
          {showEditor && (
            <Row className="d-flex justify-content-center">
              {/* Suspense with a fallback UI for the lazy-loaded editor */}
              <Suspense
                fallback={<Spinner animation="border" variant="primary" />}
              >
                <JoditUpdateEditor parentComponent={"blog"} data={blog} />
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

export default AdminEditBlog;
