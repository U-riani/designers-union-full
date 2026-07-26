import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  FloatingLabel,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useCreateDesignerMutation } from "../../data/designersSlice2";

const AdminAddDesigner = () => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const [createDesigner] = useCreateDesignerMutation();
  const { t } = useTranslation();

  const [name, setName] = useState({ ge: "", en: "" });
  const [text, setText] = useState({ ge: "", en: "" });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [projectPhoto, setProjectPhoto] = useState(null);
  const [behance, setBehance] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [companyPerson, setCompanyPerson] = useState("person");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", variant: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  const clearForm = () => {
    setName({ ge: "", en: "" });
    setText({ ge: "", en: "" });
    setEmail("");
    setPhone("");
    setProfilePhoto(null);
    setProjectPhoto(null);
    setBehance("");
    setFacebook("");
    setInstagram("");
    setCompanyPerson("person");
    setFieldErrors({});
  };

  const validateForm = () => {
    const errors = {};

    if (!name.ge.trim()) errors.name = t("nameRequired");
    if (!email.trim()) errors.email = t("emailRequired");
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = t("invalidEmail");

    if (!phone.trim()) errors.phone = t("phoneRequired");
    else if (!/^\+?\d{7,15}$/.test(phone)) errors.phone = t("invalidPhone");

    if (profilePhoto && profilePhoto.size > maxSize)
      errors.profilePhoto = t("maxSizeErroProfilePhoto");

    if (projectPhoto && projectPhoto.size > maxSize)
      errors.projectPhoto = t("maxSizeErroProjectPhoto");

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage({ text: "", variant: "" });

    const isValid = validateForm();
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name[ge]", name.ge);
    formData.append("name[en]", name.en);
    formData.append("text[ge]", text.ge);
    formData.append("text[en]", text.en);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("facebook", facebook);
    formData.append("instagram", instagram);
    formData.append("behance", behance);
    formData.append("companyPerson", companyPerson);
    formData.append("activeStatus", "true");
    formData.append("role", "admin");

    if (profilePhoto) formData.append("profileImage", profilePhoto);
    if (projectPhoto) formData.append("projectImage", projectPhoto);

    try {
      await createDesigner(formData).unwrap();
      setMessage({ text: t("successfullyRegistered"), variant: "success" });
      clearForm();
    } catch (error) {
      const backendMessage =
        error?.data?.message || error?.error || error?.message || t("somethingWentWrong");
      setMessage({ text: backendMessage, variant: "danger" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > maxSize) {
      setFieldErrors((prev) => ({
        ...prev,
        profilePhoto: t("maxSizeErroProfilePhoto"),
      }));
      setProfilePhoto(null);
    } else {
      setFieldErrors((prev) => {
        const { profilePhoto, ...rest } = prev;
        return rest;
      });
      setProfilePhoto(file);
    }
  };

  const handleProjectPhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > maxSize) {
      setFieldErrors((prev) => ({
        ...prev,
        projectPhoto: t("maxSizeErroProjectPhoto"),
      }));
      setProjectPhoto(null);
    } else {
      setFieldErrors((prev) => {
        const { projectPhoto, ...rest } = prev;
        return rest;
      });
      setProjectPhoto(file);
    }
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <Form className="registration-form p-4">
            <FloatingLabel label={t("fullName")} className="mb-3">
              <Form.Control
                value={name.ge}
                onChange={(e) => {
                  setName((prev) => ({ ...prev, ge: e.target.value }));
                  setFieldErrors((prev) => {
                    const { name, ...rest } = prev;
                    return rest;
                  });
                }}
                isInvalid={!!fieldErrors.name}
                placeholder={t("fullName")}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.name}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel label="Full name ENG" className="mb-3">
              <Form.Control
                value={name.en}
                onChange={(e) => setName((prev) => ({ ...prev, en: e.target.value }))}
                placeholder="Full name ENG"
              />
            </FloatingLabel>

            <Form.Control
              as="textarea"
              rows={3}
              className="mb-3"
              value={text.ge}
              onChange={(e) => setText((prev) => ({ ...prev, ge: e.target.value }))}
              placeholder="ქართ ტექსტი"
            />
            <Form.Control
              as="textarea"
              rows={3}
              className="mb-3"
              value={text.en}
              onChange={(e) => setText((prev) => ({ ...prev, en: e.target.value }))}
              placeholder="Text ENG"
            />

            <FloatingLabel label="Email" className="mb-3">
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((prev) => {
                    const { email, ...rest } = prev;
                    return rest;
                  });
                }}
                isInvalid={!!fieldErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.email}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel label="Phone" className="mb-3">
              <Form.Control
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setFieldErrors((prev) => {
                    const { phone, ...rest } = prev;
                    return rest;
                  });
                }}
                isInvalid={!!fieldErrors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.phone}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
              label={fieldErrors.profilePhoto ? t("uploadProfilePhoto") : profilePhoto ? t("uploadedProfilePhoto") : t("uploadProfilePhoto")}
              className={`upload-label mb-3 ${
                fieldErrors.profilePhoto
                  ? "is-invalid border border-danger rounded-2"
                  : profilePhoto
                  ? "border border-success rounded-2"
                  : ""
              }`}
            >
              <div
                className="form-control"
                onClick={() => document.getElementById("adminProfilePhoto").click()}
              >
                {profilePhoto?.name || t("clickToUpload")}
              </div>
              <Form.Control
                id="adminProfilePhoto"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleProfilePhotoChange}
              />
            </FloatingLabel>

            <FloatingLabel
              label={fieldErrors.projectPhoto ? t("uploadProjectsPhoto") : projectPhoto ? t("uploadedProjectsPhoto") : t("uploadProjectsPhoto")}
              className={`upload-label mb-3 ${
                fieldErrors.projectPhoto
                  ? "is-invalid border border-danger rounded-2"
                  : projectPhoto
                  ? "border border-success rounded-2"
                  : ""
              }`}
            >
              <div
                className="form-control"
                onClick={() => document.getElementById("adminProjectPhoto").click()}
              >
                {projectPhoto?.name || t("clickToUpload")}
              </div>
              <Form.Control
                id="adminProjectPhoto"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleProjectPhotoChange}
              />
            </FloatingLabel>

            {/* Social Links */}
            <FloatingLabel label="Behance / Website" className="mb-3">
              <Form.Control
                type="url"
                value={behance}
                onChange={(e) => setBehance(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Instagram" className="mb-3">
              <Form.Control
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Facebook" className="mb-3">
              <Form.Control
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </FloatingLabel>

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-100 py-2 fw-bold"
            >
              {isLoading ? <Spinner animation="border" size="sm" /> : t("submit")}
            </Button>

            {message.text && (
              <Alert variant={message.variant} className="mt-3">
                {message.text}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAddDesigner;
