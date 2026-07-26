import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetTeamMembersQuery,
  useUpdateTeamMemberMutation,
} from "../../data/apiTeamSlice";

const AdminEditTeamMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: team, isLoading } = useGetTeamMembersQuery();
  const [updateTeamMember] = useUpdateTeamMemberMutation();

  const member = team?.find((m) => m._id === id);

  const [initialized, setInitialized] = useState(false);

  const [type, setType] = useState("");
  const [name, setName] = useState({ ge: "", en: "" });
  const [position, setPosition] = useState({ ge: "", en: "" });
  const [description, setDescription] = useState({ ge: "", en: "" });
  const [shortDescription, setShortDescription] = useState({ ge: "", en: "" });

  const [responsibilities, setResponsibilities] = useState({
    ge: "",
    en: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ---------- init ----------
  useEffect(() => {
    if (member && !initialized) {
      setType(member.type);
      setName(member.name);
      setPosition(member.position);
      setDescription(member.description || { ge: "", en: "" });
      setShortDescription(member.shortDescription || { ge: "", en: "" });

      setResponsibilities({
        ge: (member.responsibilities?.ge || []).join("\n"),
        en: (member.responsibilities?.en || []).join("\n"),
      });

      setInitialized(true);
    }
  }, [member, initialized]);

  if (isLoading || !initialized) return <Spinner />;
  if (!member) return <Alert variant="danger">Team member not found</Alert>;

  // ---------- submit ----------
  const handleSubmit = async () => {
    setSaving(true);
    setError("");

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
          formData.append(`responsibilities[ge][${i}]`, item)
        );

      responsibilities.en
        .split("\n")
        .map((v) => v.trim())
        .filter(Boolean)
        .forEach((item, i) =>
          formData.append(`responsibilities[en][${i}]`, item)
        );
    }

    if (type === "board") {
      formData.append("shortDescription[ge]", shortDescription.ge);
      formData.append("shortDescription[en]", shortDescription.en);
    }

    if (image) {
      formData.append("images", image);
    }

    try {
      await updateTeamMember({ id, formData }).unwrap();
      navigate("/admin/team");
    } catch {
      setError("Failed to update team member");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Row className="py-4">
      <Col sm={12} className="mx-auto" style={{ maxWidth: 600 }}>
        <Form className="p-4 shadow bg-white rounded">

          <Form.Group className="mb-3">
            <Form.Label>Member type</Form.Label>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="featured">Featured member</option>
              <option value="board">Board member</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name (GE)</Form.Label>
            <Form.Control
              value={name.ge}
              onChange={(e) => setName({ ...name, ge: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name (EN)</Form.Label>
            <Form.Control
              value={name.en}
              onChange={(e) => setName({ ...name, en: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Position (GE)</Form.Label>
            <Form.Control
              value={position.ge}
              onChange={(e) =>
                setPosition({ ...position, ge: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Position (EN)</Form.Label>
            <Form.Control
              value={position.en}
              onChange={(e) =>
                setPosition({ ...position, en: e.target.value })
              }
            />
          </Form.Group>

          {type === "featured" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Description (GE)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description.ge}
                  onChange={(e) =>
                    setDescription({ ...description, ge: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description (EN)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description.en}
                  onChange={(e) =>
                    setDescription({ ...description, en: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Responsibilities (GE – one per line)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={responsibilities.ge}
                  onChange={(e) =>
                    setResponsibilities({
                      ...responsibilities,
                      ge: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Responsibilities (EN – one per line)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={responsibilities.en}
                  onChange={(e) =>
                    setResponsibilities({
                      ...responsibilities,
                      en: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </>
          )}

          {type === "board" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Short description (GE)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={shortDescription.ge}
                  onChange={(e) =>
                    setShortDescription({
                      ...shortDescription,
                      ge: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Short description (EN)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={shortDescription.en}
                  onChange={(e) =>
                    setShortDescription({
                      ...shortDescription,
                      en: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </>
          )}

          <Row className="mb-3">
            <Col>
              <div className="fw-bold mb-2">Current image</div>
              <img
                src={member.image}
                alt="Current"
                className="w-100 rounded border"
                style={{ maxHeight: 200, objectFit: "cover" }}
              />
            </Col>

            {preview && (
              <Col>
                <div className="fw-bold mb-2">New image</div>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-100 rounded border border-primary"
                  style={{ maxHeight: 200, objectFit: "cover" }}
                />
              </Col>
            )}
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Replace image</Form.Label>
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

          {error && <Alert variant="danger">{error}</Alert>}

          <Button onClick={handleSubmit} disabled={saving} className="w-100">
            {saving ? <Spinner size="sm" /> : "Update"}
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default AdminEditTeamMember;
