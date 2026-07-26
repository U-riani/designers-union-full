import React, { useState } from "react";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
// import HeroBanner from "../../components/HeroBanner";
import {
  useGetAllPartnersQuery,
  useCreatePartnerMutation,
} from "../../data/partnersSlice";

const AdminAddPartners = () => {
  const { data: allPartners } = useGetAllPartnersQuery();
  const [createPartner] = useCreatePartnerMutation();
  const [imageFile, setImageFile] = useState(null);
  const [text, setText] = useState({ ge: "", en: "" });
  const [name, setName] = useState({ ge: "", en: "" });
  const [websiteUrl, setWebsiteUrl] = useState("");

  const [statusMessage, setStatusMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  console.log(allPartners);

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

  const handleSubmit = async () => {
    if (!text.ge || !text.en) {
      setStatusMessage({
        type: "error",
        text: "Please fill in both text fields.",
      });
      return;
    }
    if (!imageFile) {
      setStatusMessage({ type: "error", text: "Please select an image file." });
      return;
    }

    const formData = new FormData();
    formData.append("name[ge]", name.ge);
    formData.append("name[en]", name.en);
    formData.append("text[ge]", text.ge);
    formData.append("text[en]", text.en);
    formData.append("websiteUrl", websiteUrl);
    formData.append("images", imageFile);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    setIsLoading(true);
    try {
      const response = await createPartner(formData).unwrap();
      setStatusMessage({ type: "success", text: "Partner created successfully!" });
      setText({ ge: "", en: "" });
      setName({ ge: "", en: "" });
      setWebsiteUrl('');
      setImageFile(null);
      console.log('check resp', response)
    } catch (error) {
      console.error("Failed to create partner:", error);
      setStatusMessage({ type: "error", text: "Failed to create partner." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mb-5">
      <Row>
        {/* <HeroBanner /> */}
      </Row>
      <Row>
        {statusMessage && (
          <Alert
            variant={statusMessage.type === "error" ? "danger" : "success"}
          >
            {statusMessage.text}
          </Alert>
        )}
        <Col xs={12}>
          <label htmlFor="add-image">Add image</label>
          <input type="file" id="add-image" onChange={handleImageChange} />
        </Col>
        <Col xs={12}>
          <label htmlFor="add-ge-name">Add Georgian name</label>
          <input
            value={name.ge}
            type="text"
            id="add-ge-name"
            onChange={(e) => handleNameChange("ge", e)}
          />
        </Col>
        <Col xs={12}>
          <label htmlFor="add-en-name">Add English name</label>
          <input
            value={name.en}
            type="text"
            id="add-en-name"
            onChange={(e) => handleNameChange("en", e)}
          />
        </Col>
        <Col xs={12}>
          <label htmlFor="add-ge-text">Add Georgian text</label>
          <input
            value={text.ge}
            type="text"
            id="add-ge-text"
            onChange={(e) => handleTextChange("ge", e)}
          />
        </Col>
        <Col xs={12}>
          <label htmlFor="add-en-text">Add English text</label>
          <input
            value={text.en}
            type="text"
            id="add-en-text"
            onChange={(e) => handleTextChange("en", e)}
          />
        </Col>
        <Col xs={12}>
          <label htmlFor="add-website">Add Website url</label>
          <input
            value={websiteUrl}
            type="text"
            id="add-website"
            onChange={(e) => setWebsiteUrl(e.target.value)}
          />
        </Col>
        <Col xs={3}>
          <Button className="mt-3" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAddPartners;
