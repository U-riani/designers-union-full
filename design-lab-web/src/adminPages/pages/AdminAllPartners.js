import React, { useState } from "react";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import {
  useDeletePartnerMutation,
  useGetAllPartnersQuery,
  useUpdatePartnerMutation,
} from "../../data/partnersSlice";

const AdminAllPartners = () => {
  const { data: allPartners, error, isLoading } = useGetAllPartnersQuery();
  const [deletePartner, { isLoading: isDeleting }] = useDeletePartnerMutation();
  const [updatePartner, { isLoading: isUpdating }] = useUpdatePartnerMutation();
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateCol, setUpdateCol] = useState(null);
  const [text, setText] = useState({ ge: "", en: "" });
  const [name, setName] = useState({ ge: "", en: "" });
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  console.log(allPartners)

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleNameChange = (lang, e) => {
    setName((prev) => ({
      ...prev,
      [lang]: e.target.value,
    }));
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
      await updatePartner({ id, text, name, image, websiteUrl }).unwrap();
      alert("Partner updated successfully!");
      // Reset form and hide update section after success
      setText({ ge: "", en: "" });
      setName({ ge: "", en: "" });
      setImage(null);
      setShowUpdate(false);
      setUpdateCol(null);
      setWebsiteUrl("");
    } catch (error) {
      alert("Update error:", error.message);
    }
  };

  const handleShowUpdate = (item) => {
    setShowUpdate(!showUpdate);
    setName(item.name);
    setText(item.text);
    setId(item._id);
    setUpdateCol(updateCol === item._id ? null : item._id);
    setWebsiteUrl(item.websiteUrl ? item.websiteUrl : "");
  };

  const handleDelete = async (id) => {
    try {
      await deletePartner(id).unwrap();
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
        {allPartners &&
          allPartners.map((item) => (
            <Col key={item._id} xs={12} className="my-3">
              <Row>
                <Col xs={6} className="admin-heros-img-container w-50">
                  <img className="w-100" src={item.image[0]} alt="Hero" />
                </Col>
                <Col xs={6} className="admin-heros-text">
                  <p>{item.name?.ge}</p>
                  <p>{item.name?.en}</p>
                  <p>{item.text?.ge}</p>
                  <p>{item.text?.en}</p>
                  <div className="d-flex">
                    <Button onClick={() => handleShowUpdate(item)}>
                      Update
                    </Button>
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
                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="mb-2"
                      />
                      <input
                        value={name.ge}
                        className="w-100 mb-2"
                        placeholder="ქართული სათაური"
                        onChange={(e) => handleNameChange("ge", e)}
                      />
                      <input
                        value={name.en}
                        onChange={(e) => handleNameChange("en", e)}
                        className="w-100 mb-2"
                        placeholder="English name"
                      />
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
                      <input
                        type="text"
                        className="w-100 mb-2"
                        placeholder="Website Url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
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

export default AdminAllPartners;
