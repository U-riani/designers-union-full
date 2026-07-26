import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SpaceComponent from "../../components/SpaceComponent";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "../../context/LocalStorageContext";
import { useParams } from "react-router-dom";

const SingleBlogPage = () => {
  const id = useParams().blogId;
  const { t, i18n } = useTranslation();
  const blogsData = useLocalStorage().localStorageData.allBlogs;
  const blog = blogsData.find((blog) => blog._id.toString() === id.toString());

  return (
    <Container
      fluid
      className="about-us-page px-0 d-flex flex-column align-items-center justify-content-start"
    >
      <SpaceComponent info={{ h1: t("blog") }} className="w-100" />
      <Row className="newsPage-row newsPage-row-2 px-md-4 py-3 my-3 my-md-4 my-lg-5 text-center single-blog-text">
        <Col sm={12}>
          <h2>{blog.title[i18n.language]}</h2>
        </Col>
        <Col sm={12}>
        <Col sm={12} className="d-flex align-center justify-content-center">
          <img src={blog.images[0]} alt="" className="single-blog-main-image" />
        </Col>
        <Col
          sm={12}
          className="single-blog-content pt-2 pt-md-3"
          dangerouslySetInnerHTML={{
            __html: blog.text[i18n.language] || blog.text.ge || blog.text.en,
          }}
        ></Col>
        </Col>
      </Row>
      {/* <Row className="newsPage-row newsPage-row-2 px-md-4 mb-3 mb-md-4 mb-lg-5 single-blog-text">
      </Row> */}
    </Container>
  );
};

export default SingleBlogPage;
