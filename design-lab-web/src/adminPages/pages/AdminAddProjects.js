import React, { useRef, useState } from "react";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import {
  useGetAllProjectsQuery,
  useCreateProjectsMutation,
} from "../../data/projectsSlice";

const AdminAddProjects = () => {
  const { data: allProjects } = useGetAllProjectsQuery();
  const [createProjects] = useCreateProjectsMutation();
  const [heroes, setHeroes] = useState({
    heroText: { ge: "", en: "" },
    imageFile: null,
  });
  const [name, setName] = useState({ ge: "", en: "" });
  const [description, setDescription] = useState({ ge: "", en: "" });
  const [mainProject, setMainProject] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRefs = useRef([]);

  const handleHeroTextChange = (lang, value) => {
    setHeroes((prevHeroes) => ({
      ...prevHeroes,
      heroText: { ...prevHeroes.heroText, [lang]: value },
    }));
  };

  const handleImageChange = (file) => {
    // Validate image type and size
    if (file && file.size > 5000000) {
      setStatusMessage({ type: "error", text: "File is too large. Max 5MB." });
      return;
    }
    if (file && !file.type.startsWith("image/")) {
      setStatusMessage({
        type: "error",
        text: "Invalid file type. Only images are allowed.",
      });
      return;
    }

    const updatedHeroes = heroes;
    updatedHeroes.imageFile = file;
    setHeroes(updatedHeroes);
  };
  console.log(allProjects);

  // console.log(heroes)

  const handleSubmit = async () => {
    // Validate each hero’s text and image fields
    if (!heroes.heroText.ge || !heroes.heroText.en || !heroes.imageFile) {
      setStatusMessage({
        type: "error",
        text: "Please complete all fields for each hero.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name[ge]", name.ge);
    formData.append("name[en]", name.en);
    formData.append("description[ge]", description.ge);
    formData.append("description[en]", description.en);
    formData.append("mainProject", mainProject);

    // Append each hero's data (text and image) to FormData
console.log(heroes.heroText.ge)
    formData.append(`heroText[ge]`, heroes.heroText.ge);
    formData.append(`heroText[en]`, heroes.heroText.en);
    formData.append(`images`, heroes.imageFile); // Append image for each hero

    setIsLoading(true);
    try {
      const response = await createProjects(formData).unwrap();
      setStatusMessage({
        type: "success",
        text: "Project created successfully!",
      });
      console.log('--create', response)
      resetFormFields();
    } catch (error) {
      console.error("Error details:", error);
      setStatusMessage({ type: "error", text: "Failed to create project." });
    } finally {
      setIsLoading(false);
    }
  };
console.log(heroes)
  const resetFormFields = () => {
    setHeroes({ heroText: { ge: "", en: "" }, imageFile: null });
    setName({ ge: "", en: "" });
    setDescription({ ge: "", en: "" });
    setMainProject(false);
    fileInputRefs.current.value = "";
  };

  return (
    <Container className="mb-5">
      <Row>
        {statusMessage && (
          <Alert
            variant={statusMessage.type === "error" ? "danger" : "success"}
          >
            {statusMessage.text}
          </Alert>
        )}
        <Col xs={12}>
          <label htmlFor="add-ge-name">Project Name (Georgian)</label>
          <input
            value={name.ge}
            type="text"
            id="add-ge-name"
            onChange={(e) => setName({ ...name, ge: e.target.value })}
          />
          <label htmlFor="add-en-name">Project Name (English)</label>
          <input
            value={name.en}
            type="text"
            id="add-en-name"
            onChange={(e) => setName({ ...name, en: e.target.value })}
          />
        </Col>
        <Col xs={12} className="my-4 d-flex flex-column ">
          <label htmlFor="add-ge-description">
            Project Description (Georgian)
          </label>
          <textarea
            value={description.ge}
            rows={4}
            id="add-ge-description"
            onChange={(e) =>
              setDescription({ ...description, ge: e.target.value })
            }
          />
          <label htmlFor="add-en-description" className="pt-2">
            Project Description (English)
          </label>
          <textarea
            value={description.en}
            rows={4}
            id="add-en-description"
            onChange={(e) =>
              setDescription({ ...description, en: e.target.value })
            }
          />
        </Col>

        <Col xs={12} className="mb-4">
          <label htmlFor={`add-ge-heroText`}>Hero Text (Georgian)</label>
          <input
            type="text"
            id={`add-ge-heroText`}
            value={heroes.heroText.ge}
            onChange={(e) => handleHeroTextChange("ge", e.target.value)}
          />
          <label htmlFor={`add-en-heroText`}>Hero Text (English)</label>
          <input
            type="text"
            id={`add-en-heroText`}
            value={heroes.heroText.en}
            onChange={(e) => handleHeroTextChange("en", e.target.value)}
          />
          <label htmlFor={`image`}>Upload Image</label>
          <input
            id={`image`}
            type="file"
            ref={(el) => (fileInputRefs.current = el)}
            onChange={(e) => handleImageChange(e.target.files[0])}
            className="form-control mb-3"
          />
        </Col>

        <Col xs={12} className="d-flex align-items-center py-2 mt-3">
          <label className="me-2" htmlFor="mainProject">
            Main Project
          </label>
          <input
            id="mainProject"
            type="checkbox"
            checked={mainProject}
            onChange={() => setMainProject(!mainProject)}
          />
        </Col>

        <Col xs={3}>
        {statusMessage && (
          <Alert
            variant={statusMessage.type === "error" ? "danger" : "success"}
          >
            {statusMessage.text}
          </Alert>
        )}
          <Button className="mt-3" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAddProjects;
