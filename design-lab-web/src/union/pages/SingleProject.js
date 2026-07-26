import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SpaceComponent from "../../components/SpaceComponent";
import { useTranslation } from "react-i18next";
import { useGetSingleProjectsQuery } from "../../data/projectsSlice";
import { useParams } from "react-router-dom";
import SingleProjectsPageCarousel from "../../components/SingleProjectspageCarousel";
import SingleProjectsPageHeroBanner from "../../components/SingleProjectsPageHeroBanner";
import LazyYouTubeVideo from "../../components/LazyYoutubeVideo";

const SingleProject = () => {
  const projectId = useParams().projectId;
  const { data: singleProject } = useGetSingleProjectsQuery(projectId);

  const { t, i18n } = useTranslation();

  const getVideoURL = (youtubeUrlFromServer) => {
    const newURL = youtubeUrlFromServer.split(" ");
    const videoSRC =
      newURL && newURL[3].substring(0, 3) === "srv"
        ? newURL[3]
        : newURL.filter((item) => item.substring(0, 3) === "src")[0];
    // console.log("getvideoURL: ", videoSRC.split('"')[1]);
    return videoSRC.split('"')[1];
  };

  // getVideoURL()


  return (
    <Container fluid className="single-project-page px-0 w-100">
      <Row className="hero-banner px-0 w-100">
        <SingleProjectsPageHeroBanner data={singleProject?.heroData} />
      </Row>
      <Row className="px-0 w-100 pb-3 pb-md-5">
        <SpaceComponent info={{ h1: singleProject?.name[i18n.language] }} />
      </Row>
      <Row className="single-project-page-projects-container d-flex flex-column align-center pt-3 pt-lg-4">
        <Col
          sm={12}
          className="pb-1 single-project-page-description-container py-3 py-md-4 px-4 mb-4 mb-lg-5"
        >
          <h3 className="pb-2 mb-0 ">{t("description")}</h3>
          <p className="mb-0">{singleProject?.description[i18n.language]}</p>
        </Col>
        {singleProject &&
          singleProject.projectContent.map((item, i) => (
            <Col
              sm={12}
              key={i}
              className="py-3 py-md-4 px-4 mb-5 single-project-page-content"
            >
              <div className="item-title-container">
                <h2 className="pb-2 mb-0">{item.title[i18n.language]}</h2>
              </div>
              {item.media.images && item.media.images.length > 0 ? (
                <SingleProjectsPageCarousel data={item.media.images} />
              ) : (
                // <div className="single-projects-youtube">
                //   <iframe
                //     src="https://www.youtube.com/embed/O-oYzGZkXp0"
                //     loading="lazy"
                //     width="100%"
                //     height="315"
                //     frameBorder="0"
                //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                //     allowFullScreen
                //   ></iframe>
                // </div>
                <LazyYouTubeVideo youtubeObj={item.media.youtube} />
              )}
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default SingleProject;
