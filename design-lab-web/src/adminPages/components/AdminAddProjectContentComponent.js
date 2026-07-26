import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useCreateProjectsContentTitleMutation, useCreateProjectsContentVideoMutation } from "../../data/projectContentSlice";
import { useParams } from "react-router-dom";

const AdminAddPrjectContentComponent = ({handleRefetch}) => {
  const projectId = useParams().projectId;
  const [toggleShow, setToggleShow] = useState(false);
  const [toggleShowImage, setToggleShowImage] = useState(false);
  const [toggleShowVideo, setToggleShowVideo] = useState(false);
  const [imagesFiles, setImagesFIles] = useState([""]);
  const [video, setVideo] = useState('');
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState({ ge: "", en: "" });

  const [createProjectsContentTitle] = useCreateProjectsContentTitleMutation();
  const [createProjectContentVideo] = useCreateProjectsContentVideoMutation()

 

  const handleTitleChange = (lang, value) => {
    setTitle((prev) => {
      return { ...prev, [lang]: value };
    });
  };



 


  const handleCreateContentTitle = async () => {
    setLoading(true)
    handleRefetch('start')
    try {
      const response = await createProjectsContentTitle({
        title,
        id: projectId,
      }).unwrap();
      if(response) {
        handleRefetch('finish');
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateContentVideo = async () => {
    try {
      const response = await createProjectContentVideo({
        video,
        id: projectId,
      }).unwrap();
      console.log("--Video:", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid>
      
        <Row>

          <Col sm={12} className="py-3">
          <h3>დაამატე ქონთენთის სათაური</h3>
          </Col>
          <Col sm={12} className="py-3">
            <label htmlFor="title-ge">ქართული სათაური</label>
            <input
              type="text"
              id="title-ge"
              value={title.ge}
              onChange={(e) => handleTitleChange("ge", e.target.value)}
            />
          </Col>
          <Col sm={12} className="py-3">
            <label htmlFor="title-en">English title</label>
            <input
              type="text"
              id="title-en"
              value={title.en}
              onChange={(e) => handleTitleChange("en", e.target.value)}
            />
          </Col>
          <Col sm={12} className="py-3">
            <Button variant="success" onClick={handleCreateContentTitle}>
              {loading?'Loading ...':'Save Title'}
            </Button>
          </Col>
          
        </Row>
      
    </Container>
  );
};

export default AdminAddPrjectContentComponent;
