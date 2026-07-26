import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";
import AdminprojectContentVideo from "./AdminprojectContentVideo";
import {
  useUpdateProjectsContentTitleMutation,
  useDeleteSingleProjectContentMutation,
} from "../../data/projectContentSlice";
import { useParams } from "react-router-dom";
import { useGetSingleProjectsQuery } from "../../data/projectsSlice";
import AdminProjectsContentImage from "./AdminProjectsContentImage";
// import { deleteProjectContent } from "../../../../backend/controllers/projectContentController";

const AdminProjectContentComponent = ({ index, handleRefetch }) => {
  const projectId = useParams().projectId;
  const [deleteSingleProjectContent] = useDeleteSingleProjectContentMutation();

  const { data: singleProject } = useGetSingleProjectsQuery(projectId);
  const [updateProjectContentTitle] = useUpdateProjectsContentTitleMutation();
  const [title, setTitle] = useState({});

  const [showTitle, setShowTitle] = useState(false);
  const [showVideoTools, setShowVideoTools] = useState(false);
  const [showImageTools, setShowImageTools] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("---", singleProject.projectContent[index].title);
    setTitle(singleProject.projectContent[index].title);
  }, [singleProject]);

  const handleTitleChange = (lang, value) => {
    setTitle((prev) => ({ ...prev, [lang]: value }));
  };

  const handleShowTitle = () => {
    setShowTitle((prev) => !prev);
    setShowVideoTools(false);
    setShowImageTools(false);
    setShowDeleteAlert(false);
  };
  const handleShowVideo = () => {
    setShowVideoTools((prev) => !prev);
    setShowTitle(false);
    setShowImageTools(false);
    setShowDeleteAlert(false);
  };
  const handleShowImageTools = () => {
    setShowImageTools((prev) => !prev);
    setShowTitle(false);
    setShowVideoTools(false);
    setShowDeleteAlert(false);
  };
  const handleShowDeleteAlert = () => {
    setShowDeleteAlert((prev) => !prev);
    setShowTitle(false);
    setShowVideoTools(false);
    setShowImageTools(false);
  };

  const handleUpdateTitle = async () => {
    handleRefetch("start");
    setLoading(true);
    try {
      const response = await updateProjectContentTitle({
        id: projectId,
        index,
        title,
      });
      if (response) {
        handleRefetch("finish");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteContent = async () => {
    handleRefetch("start");
    setLoading(true);
    try {
      const response = await deleteSingleProjectContent({
        id: projectId,
        index,
      });
      if (response) {
        handleRefetch("finish");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col className="">
          <Button variant="warning" onClick={handleShowTitle}>
            Update Title
          </Button>
          <Button
            className="mx-3"
            variant="warning"
            onClick={handleShowImageTools}
          >
            Update Image
          </Button>
          <Button className="me-3" variant="warning" onClick={handleShowVideo}>
            Update Video
          </Button>
          <Button variant="danger" onClick={handleShowDeleteAlert}>
            Delete Content
          </Button>
        </Col>
      </Row>
      <Row>
        {showTitle ? (
          <Col>
            <h2>Update title</h2>
            <Col>
              <label htmlFor="update-title-ge">update title</label>
              <input
                type="text"
                id="update-title-ge"
                value={title.ge || ""}
                onChange={(e) => handleTitleChange("ge", e.target.value)}
              />
            </Col>
            <Col>
              <label htmlFor="update-title-en">update title</label>
              <input
                type="text"
                id="update-title-en"
                value={title.en || ""}
                onChange={(e) => handleTitleChange("en", e.target.value)}
              />
            </Col>
            <Col>
              <Button variant="success" onClick={handleUpdateTitle}>
                {loading?'Loading ...':'Update'}
              </Button>
            </Col>
          </Col>
        ) : showImageTools ? (
          <AdminProjectsContentImage handleRefetch={handleRefetch} index={index} id={projectId} />
        ) : showVideoTools ? (
          <AdminprojectContentVideo handleRefetch={handleRefetch} index={index} />
        ) : showDeleteAlert ? (
          <Alert variant="danger" className="mt-3">
            <Alert.Heading>Warning!</Alert.Heading>
            <p>Are you sure you want to delete this -- Content -- ?</p>
            <Button variant="danger" onClick={handleDeleteContent}>
              {loading?'Deleting ...':'Confirm Delete'}
            </Button>
            <Button variant="secondary" className="mx-2">
              Cancel
            </Button>
          </Alert>
        ) : null}
      </Row>
    </Container>
  );
};

export default AdminProjectContentComponent;
