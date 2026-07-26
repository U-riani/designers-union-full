import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SpaceComponent from "../../components/SpaceComponent";
import { useGetAllProjectsQuery } from "../../data/projectsSlice";

const AdminAllProjects = () => {

  const { data: allProjects } = useGetAllProjectsQuery();
  console.log(allProjects);
  const { t, i18n } = useTranslation();

  return (
    <Container fluid className="projects-page px-0 mb-4 pb-4 pb-lg-5">
      <SpaceComponent info={{ h1: t("projects") }} />
      <Row className="projects-page-inner-containr px-0 mb-0">
        {allProjects &&
          allProjects.map((proj, i) => (
            <Col
              key={i}
              as={Link}
              to={`/admin/all-projects/${proj._id}`}
              sm={12}
              className={`projects-page-project-col py-3`}
            >
              <div className="projects-page-img-container">
                <img src={proj.heroData[0]?.image.url} alt="" />
              </div>
              <div className="projects-page-title-container p-3">
                <h3 className="pt-1">{proj.name[i18n.language]}</h3>
              </div>
            </Col>
          ))}
        {/* <Col
          as={Link}
          to={`/admin/all-projects/project-${projectname}`}
          sm={12}
          className={`projects-page-project-col py-3`}
        ></Col>
        <Col
          as={Link}
          to={`/admin/all-projects/project-${projectname}`}
          sm={12}
          className={`projects-page-project-col pb-3`}
        >
          <div className="projects-page-img-container">
            <img src={image1} alt="" />
          </div>
          <div className="projects-page-title-container p-3">
            <h3 className="pt-1">PROJECT</h3>
          </div>
        </Col>
        <Col
          as={Link}
          to={`/admin/all-projects/project-${projectname}`}
          sm={12}
          className={`projects-page-project-col`}
        >
          <div className="projects-page-img-container">
            <img src={image1} alt="" />
          </div>
          <div className="projects-page-title-container p-3">
            <h3 className="pt-1">PROJECT</h3>
          </div>
        </Col> */}
        {/* <Row className="projectsComponent-row-2 px-0">
          <div className="projectsComponent-projects-container px-0">
            <div className="projectsComponent-project projectsComponent-project-1">
              <Link to={`/podcast`}>
                <div className="projectsComponent-project-inner-container mx-0">
                  <div className="projectsComponent-project-image-container ">
                    <img
                      src={image1}
                      className="projectsComponent-project-image"
                      alt=""
                    />
                  </div>
                  <div className="projectsComponent-project-text-container mb-3 mb-lg-5">
                    <p>PODCAST</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="projectsComponent-project projectsComponent-project-2">
              <a href="https://design-lab.ge/index.html"
                      target="_blank"
                      rel="noopener noreferrer" >
                <div className="projectsComponent-project-inner-container">
                  <div className="projectsComponent-project-image-container projectsComponent-project-image-container-2">
                    <img
                      src={image2}
                      className="projectsComponent-project-image"
                      alt=""
                    />
                  </div>
                  <div className="projectsComponent-project-text-container projectsComponent-project-text-container-2">
                    <p>DESIGN-LAB</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="projectsComponent-project projectsComponent-project-3">
              <Link to={`/school`}>
                <div className="projectsComponent-project-inner-container">
                  <div className="projectsComponent-project-image-container">
                    <img
                      src={image3}
                      className="projectsComponent-project-image"
                      alt=""
                    />
                  </div>
                  <div className="projectsComponent-project-text-container mb-3 mb-lg-5">
                    <p>SCHOOL</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </Row> */}
        <Row className="mb-0"></Row>
      </Row>
    </Container>
  );
};

export default AdminAllProjects;
