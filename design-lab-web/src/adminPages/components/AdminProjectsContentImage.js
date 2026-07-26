import React, { useEffect, useState } from "react";
import { Button, Row, Col, Alert } from "react-bootstrap";
import {
  useUpdateProjectsContentImageMutation,
  useGetSingleProjectContentQuery,
  useDeleteSingleProjectContentImageMutation,
  
} from "../../data/projectContentSlice";

const AdminProjectsContentImage = ({ index, id, handleRefetch }) => {
  const [updateProjectContentImage] = useUpdateProjectsContentImageMutation();
  const [deleteSingleProjectContentImage] =
    useDeleteSingleProjectContentImageMutation();
  const { data: singleProjectContent , refetch} = useGetSingleProjectContentQuery({
    id,
    index,
  });
  const [showAddImage, setShowAddImage] = useState(false);
  const [showUpdateImage, setShowUpdateImage] = useState(false);
  const [showDeleteImage, setShowDeleteImage] = useState(false);
  const [showDeleteImageAlert, setShowDeleteImageAlert] = useState(false);
  const [imagesFiles, setImagesFiles] = useState([{ image: null }]);
  const [imagesFilesUpdate, setImagesFilesUpdate] = useState({ image: null });
  const [deleteImageIndex, setDeleteImageIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createButtonIndexArr, setCreateButtonIndexArr] = useState([]);
  console.log("createButtonIndexArr", createButtonIndexArr);

  useEffect(() => {
    refetch()
  
  }, [refetch])

  useEffect(() => {
    if (
      singleProjectContent?.media.images &&
      singleProjectContent.media.images?.length > 0
    ) {
      setImagesFilesUpdate(singleProjectContent.media.images);
    }
  }, [singleProjectContent]);

  console.log("imagesFiles", imagesFiles);

  console.log(imagesFiles);
  const handleShowAddImage = () => {
    setShowAddImage((prev) => !prev);
    setShowUpdateImage(false);
    setShowDeleteImage(false);
    setCreateButtonIndexArr([]);
    setImagesFiles([{ image: null }]);
  };
  const handleShowUpdateImage = () => {
    setShowAddImage(false);
    setShowUpdateImage((prev) => !prev);
    setShowDeleteImage(false);
    setCreateButtonIndexArr([]);
    setImagesFiles([{ image: null }]);
  };
  const handleShowDeleteImage = () => {
    setShowAddImage(false);
    setShowUpdateImage(false);
    setShowDeleteImage((prev) => !prev);
    setCreateButtonIndexArr([]);
    setImagesFiles([{ image: null }]);
  };
  // const handleShowDeleteImageAlert = () => {
  //   setShowAddImage(false);
  //   setShowUpdateImage(false);
  //   setShowDeleteImageAlert((prev) => !prev);
  // };

  const handleShowDeleteImageAlert = (localIndex) => {
    setDeleteImageIndex(localIndex);
  };

  const handleCloseDeleteImageAlert = () => {
    setDeleteImageIndex(null);
  };

  const handleAddMoreImages = () => {
    const newImage = {
      image: null,
    };
    setImagesFiles([...imagesFiles, newImage]);
  };

  const handleImageChange = (localIndex, file) => {
    const updatedImages = imagesFiles.map((el, i) =>
      i === localIndex ? { image: file, url: URL.createObjectURL(file) } : el
    );
    setImagesFiles(updatedImages);
  };

  const handleImagesFilesUpdateChange = (localIndex, file) => {
    const updatedImages = imagesFilesUpdate.map((el, i) =>
      i === localIndex ? { image: file, url: URL.createObjectURL(file) } : el
    );
    setImagesFilesUpdate(updatedImages);
  };

  console.log(imagesFilesUpdate);

  // const handleCreateImage = async (localIndex, type) => {
  //   try {
  //     console.log("--Create:", localIndex);
  //     const response = await updateProjectContentImage({
  //       id,
  //       image: imagesFiles[localIndex].image,
  //       index,
  //       localIndex,
  //       type,
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleUpdateImage = async (localIndex, type) => {
    handleRefetch("start");
    setLoading(true);

    try {
      console.log("--Update:", localIndex);
      const response = await updateProjectContentImage({
        id,
        image:
          type === "create"
            ? imagesFiles[localIndex].image
            : imagesFilesUpdate[localIndex].image,
        index,
        localIndex,
        type,
      });
      if (response) {
        refetch()
        handleRefetch("finish");
        setLoading(false);
        if (type === "create") {
          setCreateButtonIndexArr((prev) => [...prev, localIndex]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteImage = async (localIndex) => {
    handleRefetch("start");
    setLoading(true);

    try {
      const response = await deleteSingleProjectContentImage({
        id,
        index,
        localIndex,
      });
      console.log("--delete:", id, index, localIndex);

      // Update UI after delete
      const updatedImages = imagesFilesUpdate.filter(
        (_, i) => i !== localIndex
      );
      setImagesFilesUpdate(updatedImages);

      // Close the alert
      handleCloseDeleteImageAlert();
      if (response) {
        refetch()
        handleRefetch("finish");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row className="py-5">
      <Col xs={3}>
        <Button className="mx-3" variant="info" onClick={handleShowAddImage}>
          Add Image
        </Button>
        {showAddImage && (
          <Col>
            {showAddImage &&
              imagesFiles.map((el, localIndex) => (
                <Col key={localIndex} sm={12} className="text-danger">
                  <label htmlFor="image">add image</label>
                  <input
                    type="file"
                    id="image"
                    onChange={(e) =>
                      handleImageChange(localIndex, e.target.files[0])
                    }
                  />
                  {el.url && (
                    <div style={{ width: "100px", height: "100px" }}>
                      <img
                        src={el.url}
                        alt="Selected"
                        width="100%"
                        height="100%"
                      />
                    </div>
                  )}
                  <Button
                    className="m-3"
                    variant="success"
                    onClick={() => handleUpdateImage(localIndex, "create")}
                    disabled={
                      createButtonIndexArr.includes(localIndex) ? true : false
                    }
                  >
                    {createButtonIndexArr.includes(localIndex)
                      ? "Image Added Successfully"
                      : loading
                      ? "Loading ..."
                      : "Create"}
                  </Button>
                  <Col className="my-3 d-flex justify-content-center align-items-center"></Col>
                </Col>
              ))}
            <Button onClick={handleAddMoreImages}>Add MoreImages</Button>
          </Col>
        )}
      </Col>
      <Col xs={3}>
        <Button
          className="mb-5"
          variant="warning"
          onClick={handleShowUpdateImage}
        >
          Update Image
        </Button>
        {showUpdateImage &&
          imagesFilesUpdate.length > 0 &&
          imagesFilesUpdate.map((el, i) => (
            <Col key={i} className="pb-4">
              <img src={el.url} width="150px" height="100px" />
              <input
                type="file"
                onChange={(e) =>
                  handleImagesFilesUpdateChange(i, e.target.files[0])
                }
              />
              <Col>
                <Button
                  className="mt-1"
                  onClick={() => handleUpdateImage(i, "update")}
                  variant="warning"
                  disabled={loading ? true : false}
                >
                  {loading ? "Loading ..." : "Update"}
                </Button>
              </Col>
            </Col>
          ))}
      </Col>
      <Col xs={3}>
        <Button
          className="mx-3"
          variant="danger"
          onClick={handleShowDeleteImage}
        >
          Delete Image
        </Button>
        {showDeleteImage &&
          imagesFilesUpdate.length > 0 &&
          imagesFilesUpdate.map((el, i) => (
            <Col key={i} className="py-2">
              <img src={el.url} width="150px" height="100px" />

              <Col>
                <Button
                  onClick={() => handleShowDeleteImageAlert(i)}
                  variant="warning"
                >
                  Delete Image
                </Button>
                {deleteImageIndex === i && (
                  <Alert variant="danger" className="mt-3">
                    <Alert.Heading>Warning!</Alert.Heading>
                    {loading ? (
                      <h3>Loading...</h3>
                    ) : (
                      <div>
                        <p>Are you sure you want to delete this image?</p>

                        <Button
                          variant="danger"
                          onClick={() => handleDeleteImage(i)}
                        >
                          Confirm Delete
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={handleCloseDeleteImageAlert}
                          className="mx-2"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </Alert>
                )}
              </Col>
            </Col>
          ))}
      </Col>
    </Row>
  );
};

export default AdminProjectsContentImage;
