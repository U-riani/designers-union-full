import React, { useState } from "react";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import {
  useDeleteHeroMutation,
  useGetAllHerosQuery,
  useUpdateHeroMutation,
} from "../../data/heroSlice";

const AdminAllHeros = () => {
  const { data: allHeros, error, isLoading } = useGetAllHerosQuery();
  const [deleteHero, { isLoading: isDeleting }] = useDeleteHeroMutation();
  const [updateHero, { isLoading: isUpdating }] = useUpdateHeroMutation();
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateCol, setUpdateCol] = useState(null);
  const [text, setText] = useState({ ge: "", en: "" });
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTextChange = (lang, e) => {
    setText((prev) => ({
      ...prev,
      [lang]: e.target.value,
    }));
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateHero({ id, text, image }).unwrap();
      alert("Hero updated successfully!");
      // Reset form and hide update section after success
      setText({ ge: "", en: "" });
      setImage(null);
      setShowUpdate(false);
      setUpdateCol(null);
    } catch (error) {
      alert("Update error:", error.message);
    }
  };

  const handleShowUpdate = (item) => {
    setShowUpdate(!showUpdate);
    setText(item.text);
    setId(item._id);
    setUpdateCol(updateCol === item._id ? null : item._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteHero(id).unwrap();
    } catch (error) {
      console.log("Delete error:", error.message);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        {isLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {error && (
          <Alert variant="danger">Failed to load heroes: {error.message}</Alert>
        )}
        {allHeros &&
          allHeros.map((item) => (
            <Col key={item._id} xs={12} className="my-3">
              <Row>
                <Col xs={6} className="admin-heros-img-container w-50">
                  <img className="w-100" src={item.image[0]} alt="Hero" />
                </Col>
                <Col xs={6} className="admin-heros-text">
                  <p>{item.text?.ge}</p>
                  <p>{item.text?.en}</p>
                  <div className="d-flex">
                    <Button onClick={() => handleShowUpdate(item)}>Update</Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item._id)}
                      disabled={isDeleting}
                      className="ms-2"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                  {updateCol === item._id && (
                    <form onSubmit={handleSubmitUpdate} className="mt-3">
                      <input type="file" onChange={handleImageChange} className="mb-2" />
                      <textarea
                        value={text.ge}
                        className="w-100 mb-2"
                        placeholder="ქართული ტექსტი"
                        onChange={(e) => handleTextChange("ge", e)}
                      />
                      <textarea
                        value={text.en}
                        onChange={(e) => handleTextChange("en", e)}
                        className="w-100 mb-2"
                        placeholder="English text"
                      />
                      <Button type="submit" disabled={isUpdating}>
                        {isUpdating ? "Saving..." : "Save Update"}
                      </Button>
                    </form>
                  )}
                </Col>
              </Row>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default AdminAllHeros;
