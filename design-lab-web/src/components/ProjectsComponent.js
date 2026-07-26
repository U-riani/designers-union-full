import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SpaceComponent from "./SpaceComponent";
import { useGetLastThreeProjectsQuery } from "../data/projectsSlice";
import { useLocalStorage } from "../context/LocalStorageContext";



const ProjectsComponent = () => {
  const image2 = require("../images/union/projects-main-images/slide2-b.jpg");
  const { data } = useGetLastThreeProjectsQuery();
  const { localStorageData, updateLocalStorageData } = useLocalStorage();
  
  const localProjectsData = localStorageData.allProjects

  // Helper function to compare news data arrays
  const isDataDifferent = (localData, serverData) => {
    if (!localData || localData.length !== serverData.length) return true;
    return JSON.stringify(localData) !== JSON.stringify(serverData);
  };
  
  useEffect(() => {
    if (data && isDataDifferent(localProjectsData, data)) {
      updateLocalStorageData("allProjects", data);
    }
  }, [data])

  // console.log('ProjectsComponent', data);
  // console.log('ProjectsComponent localData', localProjectsData);

  const { t, i18n } = useTranslation();

  return (
    <Container fluid className="projects-component px-0 mb-0">
      <SpaceComponent info={{ h1: t("projects") }} />
      <Row className="projects-component-inner-containr py-3 pb-5 py-md-5 px-0 mb-0">
        <Row className="projectsComponent-row-2 px-0">
          <div className="projectsComponent-projects-container px-0">
            <div className="projectsComponent-project projectsComponent-project-1">
              {localProjectsData && (
                <Link to={`/projects/${localProjectsData[0]?.id}`}>
                  <div className="projectsComponent-project-inner-container mx-0">
                    <div className="projectsComponent-project-image-container ">
                      <img
                        src={localProjectsData[0]?.image}
                        className="projectsComponent-project-image"
                        alt=""
                      />
                    </div>
                    <div className="projectsComponent-project-text-container mb-1 mb-lg-3 py-1 py-xl-2 px-1">
                      <p className="px-md-2 ">{localProjectsData[0]?.name[i18n.language]}</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
            <div className="projectsComponent-project projectsComponent-project-2">
              <a
                href="https://www.design-lab.ge"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="projectsComponent-project-inner-container">
                  <div className="projectsComponent-project-image-container projectsComponent-project-image-container-2">
                    <img
                      src={image2}
                      className="projectsComponent-project-image"
                      alt=""
                    />
                  </div>
                  <div className="projectsComponent-project-text-container projectsComponent-project-text-container-2 ">
                    <p>{t("designLab")}</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="projectsComponent-project projectsComponent-project-3">
              {localProjectsData && (
                <Link to={`/projects/${localProjectsData[1]?.id}`}>
                  <div className="projectsComponent-project-inner-container mx-0">
                    <div className="projectsComponent-project-image-container ">
                      <img
                        src={localProjectsData[1]?.image}
                        className="projectsComponent-project-image"
                        alt=""
                      />
                    </div>
                    <div className="projectsComponent-project-text-container mb-1 mb-lg-3 py-1 py-xl-2 px-1">
                      <p className="px-md-2 ">{localProjectsData[1]?.name[i18n.language]}</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </Row>
        <Row className="mb-0 pt-3 pt-lg-4 px-0 projects-component-button-container">
          <Col className="d-flex justify-content-end mb-0 px-0">
          <div className="newsComponent-see-more-button-col overflow-hidden d-flex align-self-end ms-auto mt-0 pb-lg-0">
            <button className="see-more">
              <Link className="see-more-link px-3 py-2 py-sm-3" to="/projects">
                <span className="pt-1">{t("more")}</span>
                <em></em>
              </Link>
            </button>
          </div>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default ProjectsComponent;
