import React, { useState } from "react";
import {
  Row,
  Col,
  FloatingLabel,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useCreateTeamMemberMutation } from "../../data/apiTeamSlice";

const AdminAddTeamMember = () => {
  const [createTeamMember] = useCreateTeamMemberMutation();

  const [type, setType] = useState("board");

  const [name, setName] = useState({ ge: "", en: "" });
  const [position, setPosition] = useState({ ge: "", en: "" });
  const [description, setDescription] = useState({ ge: "", en: "" });
  const [shortDescription, setShortDescription] = useState({ ge: "", en: "" });
  const [responsibilities, setResponsibilities] = useState({ ge: "", en: "" });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", variant: "" });

  const resetForm = () => {
    setName({ ge: "", en: "" });
    setPosition({ ge: "", en: "" });
    setDescription({ ge: "", en: "" });
    setShortDescription({ ge: "", en: "" });
    setResponsibilities({ ge: "", en: "" });
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    setMessage({ text: "", variant: "" });

    // 🔴 base validation
    if (!name.ge.trim() || !position.ge.trim()) {
      setMessage({
        text: "Name (GE) and Position (GE) are required",
        variant: "danger",
      });
      return;
    }

    // 🔴 type-specific validation
    if (type === "featured" && !description.ge.trim()) {
      setMessage({
        text: "Featured member requires description (GE)",
        variant: "danger",
      });
      return;
    }

    if (type === "board" && !shortDescription.ge.trim()) {
      setMessage({
        text: "Board member requires short description (GE)",
        variant: "danger",
      });
      return;
    }

    if (!image) {
      setMessage({
        text: "Profile image is required",
        variant: "danger",
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    formData.append("type", type);
    formData.append("name[ge]", name.ge);
    formData.append("name[en]", name.en);
    formData.append("position[ge]", position.ge);
    formData.append("position[en]", position.en);

    if (type === "featured") {
      formData.append("description[ge]", description.ge);
      formData.append("description[en]", description.en);

      responsibilities.ge
        .split("\n")
        .map((v) => v.trim())
        .filter(Boolean)
        .forEach((item, i) =>
          formData.append(`responsibilities[ge][${i}]`, item),
        );

      responsibilities.en
        .split("\n")
        .map((v) => v.trim())
        .filter(Boolean)
        .forEach((item, i) =>
          formData.append(`responsibilities[en][${i}]`, item),
        );
    }

    if (type === "board") {
      formData.append("shortDescription[ge]", shortDescription.ge);
      formData.append("shortDescription[en]", shortDescription.en);
    }

    formData.append("images", image);

    try {
      await createTeamMember(formData).unwrap();
      setMessage({
        text: "Team member added successfully",
        variant: "success",
      });
      resetForm();
    } catch (err) {
      setMessage({
        text: err?.data?.message || "Something went wrong",
        variant: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Row className="py-4">
      <Col sm={12} className="mx-auto" style={{ maxWidth: 600 }}>
        <Form className="p-4 shadow bg-white rounded">
          <FloatingLabel label="Member Type" className="mb-3">
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="board">Board</option>
              <option value="featured">Featured</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel label="Name (GE)" className="mb-3">
            <Form.Control
              value={name.ge}
              onChange={(e) => setName({ ...name, ge: e.target.value })}
            />
          </FloatingLabel>

          <FloatingLabel label="Name (EN)" className="mb-3">
            <Form.Control
              value={name.en}
              onChange={(e) => setName({ ...name, en: e.target.value })}
            />
          </FloatingLabel>

          <FloatingLabel label="Position (GE)" className="mb-3">
            <Form.Control
              value={position.ge}
              onChange={(e) => setPosition({ ...position, ge: e.target.value })}
            />
          </FloatingLabel>

          <FloatingLabel label="Position (EN)" className="mb-3">
            <Form.Control
              value={position.en}
              onChange={(e) => setPosition({ ...position, en: e.target.value })}
            />
          </FloatingLabel>

          {/* 🔵 FEATURED */}
          {type === "featured" && (
            <>
              <FloatingLabel label="Description (GE)" className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description.ge}
                  onChange={(e) =>
                    setDescription({ ...description, ge: e.target.value })
                  }
                />
              </FloatingLabel>

              <FloatingLabel label="Description (EN)" className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description.en}
                  onChange={(e) =>
                    setDescription({ ...description, en: e.target.value })
                  }
                />
              </FloatingLabel>

              <Form.Label>
                Responsibilities (GE – one per line) - (optional)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                className="mb-3"
                value={responsibilities.ge}
                onChange={(e) =>
                  setResponsibilities({
                    ...responsibilities,
                    ge: e.target.value,
                  })
                }
              />

              <Form.Label>
                Responsibilities (EN – one per line) - (optional)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                className="mb-3"
                value={responsibilities.en}
                onChange={(e) =>
                  setResponsibilities({
                    ...responsibilities,
                    en: e.target.value,
                  })
                }
              />
            </>
          )}

          {/* 🔵 BOARD */}
          {type === "board" && (
            <>
              <FloatingLabel label="Short Description (GE)" className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={shortDescription.ge}
                  onChange={(e) =>
                    setShortDescription({
                      ...shortDescription,
                      ge: e.target.value,
                    })
                  }
                />
              </FloatingLabel>

              <FloatingLabel label="Short Description (EN)" className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={shortDescription.en}
                  onChange={(e) =>
                    setShortDescription({
                      ...shortDescription,
                      en: e.target.value,
                    })
                  }
                />
              </FloatingLabel>
            </>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Profile image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                if (file) setPreview(URL.createObjectURL(file));
              }}
            />
          </Form.Group>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-100 rounded mb-3"
              style={{ maxHeight: 220, objectFit: "cover" }}
            />
          )}

          <Button onClick={handleSubmit} disabled={isLoading} className="w-100">
            {isLoading ? <Spinner size="sm" /> : "Submit"}
          </Button>

          {message.text && (
            <Alert variant={message.variant} className="mt-3">
              {message.text}
            </Alert>
          )}
        </Form>
      </Col>
    </Row>
  );
};

export default AdminAddTeamMember;
