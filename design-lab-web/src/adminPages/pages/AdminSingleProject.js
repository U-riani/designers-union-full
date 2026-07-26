import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import SpaceComponent from "../../components/SpaceComponent";
import { useTranslation } from "react-i18next";
import {
  useGetSingleProjectsQuery,
  useDeleteProjectsMutation,
} from "../../data/projectsSlice";
import { useNavigate, useParams } from "react-router-dom";
import AdminProjectContentComponent from "../components/AdminProjectContentComponent";
import AdminAddPrjectContentComponent from "../components/AdminAddProjectContentComponent";
import SingleProjectsPageHeroBanner from "../../components/SingleProjectsPageHeroBanner";
import SingleProjectsPageCarousel from "../../components/SingleProjectspageCarousel";
import AdminProjectDescription from "../components/AdminProjectsDescription";
import AdminProjectsHeroDataComponent from "../components/AdminProjectsHeroDataComponent";

const AdminSingleProject = () => {
  const projectId = useParams().projectId;
  // const {
  //   data: allProjects,
  //   error: allErrors,
  //   isLoading: allIsLoading,
  // } = useGetAllProjectsQuery();
  const [deleteProjects] = useDeleteProjectsMutation();
  const {
    data: singleProject,
    refetch
  } = useGetSingleProjectsQuery(projectId);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()

  const [heroData, setHeroData] = useState([]);
  const [showEditNameDescription, setShowEditNameDescription] = useState(false); // State to control visibility of AdminEditProjects
  const [showEditHero, setShowEditHero] = useState(false); // State to control visibility of AdminEditProjects
  const [showAddContent, setShowAddContent] = useState(false); // State to control visibility of AdminEditProjects
  const [showDeleteAlert, setShowDeleteAlert] = useState(false); // State to control visibility of AdminEditProjects
  const [refetchStatus, setRefetchStatus] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleRefetch = (refetchFromChild) => {
    if(refetchFromChild === 'start') {
      // setLoading(true)
      console.log('starting fetch from child', refetchFromChild)
    }else if(refetchFromChild === 'finish') {
      console.log('finish fetch from child', refetchFromChild)
      // setLoading(false)
      // setRefetchStatus(true);
      setShowEditNameDescription(false);
      setShowEditHero(false);
      setShowAddContent(false);
      setShowDeleteAlert(false)
      refetch()
    }

      setRefetchStatus(false);
  };

  const handleShowDeleteAlert = () => {
    setShowDeleteAlert((prevState) => !prevState);
    setShowEditNameDescription(false);
    setShowEditHero(false);
    setShowAddContent(false);
  };

  useEffect(() => {
    if (singleProject) {
      singleProject.heroData.map((el, i) => {
        setHeroData((prev) => {
          return [...prev, singleProject.heroData];
        });
      });
    }
  }, [singleProject]);

  useEffect(() => {
    refetch()
  }, [refetch]);

  const handleUpdateNameDescription = () => {
    // Toggle the visibility of AdminEditProjects when "Update" is clicked
    setShowEditNameDescription((prevState) => !prevState);
    setShowEditHero(false);
    setShowAddContent(false);
    setShowDeleteAlert(false);
  };

  const handleUpdateHero = () => {
    // Toggle the visibility of AdminEditProjects when "Update" is clicked
    setShowEditHero((prevState) => !prevState);
    setShowEditNameDescription(false);
    setShowAddContent(false);
    setShowDeleteAlert(false);
  };

  const handleAddContent = () => {
    // Toggle the visibility of AdminEditProjects when "Update" is clicked
    setShowAddContent((prevState) => !prevState);
    setShowEditNameDescription(false);
    setShowEditHero(false);

    setShowDeleteAlert(false);
  };

  const handleDeleteProject = async () => {
    setLoading(true)
    try {
      const id = projectId;
      const response = await deleteProjects(id).unwrap();
      console.log("---deleted project", response);
      if(response) {
        setLoading(false);
        refetch()
        navigate('/admin/all-projects');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const extractVideoId = (url) => {
  //   const regex =
  //     /(?:youtube\.com\/(?:[^/]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:[^&?/]+))?(\S{11}))/;
  //   const match = url.match(regex);
  //   return match ? match[1] : null;
  // };

  // const myUrl = extractVideoId(singleProject.projectContent[1].media.youtube)
  // console.log(myUrl)

  console.log(singleProject);
  return (
    <Container fluid className="single-project-page px-0 w-100">
      {singleProject && (
        <Row className="mx-0 w-100 d-flex flex-column align-content-center">
          <Row className="hero-banner px-0 w-100">
            <SingleProjectsPageHeroBanner data={singleProject?.heroData[0].image.url ?  singleProject?.heroData : [{image: {url: ''}, heroText: {ge: '', en: ''}}]} />
          </Row>
          <Row className="px-0 w-100">
            <SpaceComponent info={{ h1: singleProject.name[i18n.language] }} />
          </Row>
          <Row className="single-project-page-projects-container w-100 px-0 d-flex flex-column align-center">
            <Col sm={12} className="pb-4">
              <h3>{t("description")}</h3>
              <p>{singleProject.description[i18n.language]}</p>
            </Col>
            <Col sm={12} className="pb-5">
              <Button variant="warning" onClick={handleUpdateNameDescription}>
                Update Name/Description
              </Button>
              <Button
                className="mx-2"
                variant="warning"
                onClick={handleUpdateHero}
              >
                Update Hero Banner
              </Button>
              <Button
                className="mx-2"
                variant="info"
                onClick={handleAddContent}
              >
                Add Content
              </Button>
              <Button variant="danger ms-5" onClick={handleShowDeleteAlert}>
                Delete Project
              </Button>
              {showDeleteAlert && (
                <Alert variant="warning">
                  <Alert.Heading>Warning !!! are you sure?</Alert.Heading>
                  <Button variant="danger ms-5" onClick={handleDeleteProject}>
                    {loading? 'Deleting ...':'Yes! Delete Project'}
                  </Button>
                </Alert>
              )}
            </Col>
            {showEditNameDescription && (
              <Col sm={12} className="py-4">
                <AdminProjectDescription handleRefetch={handleRefetch} data={singleProject} />

                {/* <AdminEditProjects projectId={projectId} /> */}
              </Col>
            )}
            {showEditHero && (
              <Col sm={12} className="py-4">
                <AdminProjectsHeroDataComponent handleRefetch={handleRefetch} data={singleProject} />

                {/* <AdminEditProjects projectId={projectId} /> */}
              </Col>
            )}
            {showAddContent && (
              <Col sm={12} className="py-4">
                <AdminAddPrjectContentComponent data={singleProject} handleRefetch={handleRefetch}/>

                {/* <AdminEditProjects projectId={projectId} /> */}
              </Col>
            )}

            {singleProject.projectContent &&
              singleProject.projectContent.map((item, index) => (
                <Col
                  sm={12}
                  key={index}
                  className="py-3 py-md-5 mb-5 single-project-page-content pb-5"
                >
                  <div className="item-title-container">
                    <h2 className="text-left">
                      {singleProject.projectContent[index].title[i18n.language]
                        ? singleProject.projectContent[index].title[
                            i18n.language
                          ]
                        : "title"}
                    </h2>
                  </div>
                  {/* <SingleProjectCarousel data={data2} className="w-100"/> */}
                  {item.media.images && item.media.images.length > 0 ? (
                    <SingleProjectsPageCarousel data={item.media.images} />
                  ) : (
                    <div
                      className="single-projects-youtube mb-3"
                      dangerouslySetInnerHTML={{
                        __html: item.media.youtube,
                      }}
                    />
                  )}
                  <AdminProjectContentComponent data={singleProject} handleRefetch={handleRefetch} index={index} />
                </Col>
              ))}
          </Row>
        </Row>
      )}
    </Container>
  );
};

export default AdminSingleProject;
