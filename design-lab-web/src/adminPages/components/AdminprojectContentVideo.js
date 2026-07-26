import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useCreateProjectsContentVideoMutation } from "../../data/projectContentSlice";
import { useParams } from "react-router-dom";

const AdminprojectContentVideo = ({index, handleRefetch}) => {

  const projectId = useParams().projectId;

  const [video, setVideo] = useState("");
  const [createProjectContentVideo] = useCreateProjectsContentVideoMutation();
  // const [updateProjectContentVideo] = useUpdateProjectsContentVideoMutation();
  const [loading, setLoading] = useState(false);

    const getVideoId = (url) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/)?([\w-]{11})|(?:youtu\.be\/)([\w-]{11})/;
    const match = url.match(regExp);
    return match && (match[1] || match[2]);
  };

  // const videoId = getVideoId(youtubeUrl);

  const handleVideoChange = (value) => {
    setVideo(getVideoId(value));
    console.log(video)
  };

  //   const handleShowAddVideo = () => {
  //     setToggleShowImage(false);
  //     setToggleShowVideo(!toggleShowVideo);
  //   };

  const handleCreateContentVideo = async () => {
    setLoading(true)
    handleRefetch('start')
    try {
      const response = await createProjectContentVideo({
        videoId: video,
        id: projectId,
        index
      }).unwrap();
      if (response) {
        handleRefetch("finish");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

//   const handleUpdateContentVideo = async () => {
//     try {
//       const response = await updateProjectContentVideo({
//         video,
//         id: projectId,
//         index
//       }).unwrap();
//       console.log("--Video updated:", response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

  return (
    <Row>
      {/* <Col sm={6} className="text-info">
        <label htmlFor="Video">add Video</label>
        <input
          type="text"
          id="Video"
          onChange={(e) => handleVideoChange(e.target.value)}
        />
        <Button variant="success" onClick={handleCreateContentVideo}>
          Create
        </Button>
      </Col> */}
      <Col sm={6} className="pt-3">
        <label htmlFor="Video">Update</label>
        <input
          type="text"
          id="Video"
          onChange={(e) => handleVideoChange(e.target.value)}
        />
        <Button className="mt-3" variant="success" onClick={handleCreateContentVideo}>
          {loading?'Loading ...':'Create/update'}
        </Button>
      </Col>
    </Row>
  );
};

export default AdminprojectContentVideo;
