import React, { useState } from "react";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
// import HeroBanner from "../../components/HeroBanner";
import { useGetAllHerosQuery, useCreateHeroMutation } from "../../data/heroSlice";

const AddHero = () => {
  const { data: allHeros } = useGetAllHerosQuery();
  const [createHero] = useCreateHeroMutation();
  const [imageFile, setImageFile] = useState(null);
  const [text, setText] = useState({ ge: "", en: "" });
  const [statusMessage, setStatusMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  console.log(allHeros)

  const handleTextChange = (lang, e) => {
    setText((prev) => ({
      ...prev,
      [lang]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!text.ge || !text.en) {
      setStatusMessage({ type: "error", text: "Please fill in both text fields." });
      return;
    }
    if (!imageFile) {
      setStatusMessage({ type: "error", text: "Please select an image file." });
      return;
    }

    const formData = new FormData();
    formData.append("text[ge]", text.ge);
    formData.append("text[en]", text.en);
    formData.append("images", imageFile);

    setIsLoading(true);
    try {
      await createHero(formData).unwrap();
      setStatusMessage({ type: "success", text: "Hero created successfully!" });
      setText({ ge: "", en: "" });
      setImageFile(null);
    } catch (error) {
      console.error("Failed to create hero:", error);
      setStatusMessage({ type: "error", text: "Failed to create hero." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mb-5">
      {/* <Row>
        <HeroBanner />
      </Row> */}
      <Row>
        {statusMessage && (
          <Alert variant={statusMessage.type === "error" ? "danger" : "success"}>
            {statusMessage.text}
          </Alert>
        )}
        <Col xs={12}>
          <label htmlFor="add-image">Add image</label>
          <input type="file" id="add-image" onChange={handleImageChange} />
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
        <Col xs={3}>
          <Button
            className="mt-3"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AddHero;
