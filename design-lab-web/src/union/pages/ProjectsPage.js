import React, { useEffect } from "react";
import { Anchor, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SpaceComponent from "../../components/SpaceComponent";
import {
  useGetAllProjectsImageTitleQuery,
  useGetAllProjectsQuery,
} from "../../data/projectsSlice";
import { useLocalStorage } from "../../context/LocalStorageContext";

const ProjectsPage = () => {
  // const image2 = require("../../images/union/projects-main-images/slide2-b.jpg");
  const { data: allProjects } = useGetAllProjectsImageTitleQuery();
  const { data: projects } = useGetAllProjectsQuery();
  const { localStorageData, updateLocalStorageData } = useLocalStorage();

  const localProjectsPageData = localStorageData.allProjectsPage;

  // Helper function to compare news data arrays
  const isDataDifferent = (localData, serverData) => {
    if (!localData || localData.length !== serverData.length) return true;
    return JSON.stringify(localData) !== JSON.stringify(serverData);
  };

  useEffect(() => {
    if (allProjects && isDataDifferent(localProjectsPageData, allProjects)) {
      updateLocalStorageData("allProjectsPage", allProjects);
    }
  }, [allProjects]);

  const { t, i18n } = useTranslation();
  // console.log("--projects:", projects);
  // console.log("--name/image:", allProjects);
  // console.log("+++projects page ", localProjectsPageData);

  return (
    <Container fluid className="projects-page px-0 mb-0">
      <SpaceComponent info={{ h1: t("projects") }} />
      <Row className="projects-page-inner-containr mx-0 px-0 mb-0 pt-5 pt-md-5">
        {/* <Col
          as={Anchor}
          href="https://www.design-lab.ge"
          target="_blank"
          rel="noopener noreferrer"
          sm={12}
          className={`projects-page-project-col mx-0 pb-5`}
        >
          <div className="projects-page-img-container">
            <img src={image2} alt="" />
          </div>
          <div className="projects-page-title-container p-3">
            <h3 className="pt-1">{t("designLab")}</h3>
            <p>{t("designLabDescription")}</p>
          </div>
        </Col> */}
        {localProjectsPageData &&
          localProjectsPageData.map((el, i) =>
            el.name.en === "Design Lab" ? (
              <Col
                key={i}
                as={Anchor}
                href="https://www.design-lab.ge"
                target="_blank"
                rel="noopener noreferrer"
                sm={12}
                className={`projects-page-project-col mx-0 pb-5`}
              >
                <div className="projects-page-img-container">
                  <img src={el.image.url} alt="" />
                </div>
                <div className="projects-page-title-container p-3">
                  <h3 className="pt-1">{el.name[i18n.language]}</h3>
                  <p>{el.text[i18n.language]}</p>
                </div>
              </Col>
            ) : (
              <Col
                key={i}
                as={Link}
                to={`/projects/${el.id}`}
                sm={12}
                className={`projects-page-project-col mx-0 pb-5`}
              >
                <div className="projects-page-img-container">
                  <img src={el.image.url} alt="" />
                </div>
                <div className="projects-page-title-container p-3">
                  <h3 className="pt-1">{el.name[i18n.language]}</h3>
                  <p>{el.text[i18n.language]}</p>
                </div>
              </Col>
            )
          )}
        {/* <Col as={Link} to={`/projects/project-${projectname}`} sm={12} className={`projects-page-project-col py-3`}>
          <div className="projects-page-img-container">
            <img src={image1} alt="" />
          </div>
          <div className="projects-page-title-container p-3">
            <h3 className="pt-1">PROJECT</h3>
          </div>
        </Col> */}
        {/* <Col as={Link} to={`/projects/project-${projectname}`} sm={12} className={`projects-page-project-col pb-3`}>
          <div className="projects-page-img-container">
            <img src={image1} alt="" />
          </div>
          <div className="projects-page-title-container p-3">
            <h3 className="pt-1">PROJECT</h3>
          </div>
        </Col> */}
        {/* <Col as={Link} to={`/projects/project-${projectname}`} sm={12} className={`projects-page-project-col`}>
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

export default ProjectsPage;
