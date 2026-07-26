import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  FloatingLabel,
  Form,
  Button,
  Spinner,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SpaceComponent from "../../components/SpaceComponent";
import { useCreateDesignerMutation } from "../../data/designersSlice2";
import DesignerCardComponent from "../../components/DesignerCardComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Registration = () => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const [createDesigner] = useCreateDesignerMutation();
  const { t } = useTranslation();

  const [name, setName] = useState({ ge: "" });
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
  const photoErrors = [];

  const clearForm = () => {
    setName({ ge: "" });
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
    const isBehanceUrl = /^https:\/\//;
    const isInstagramUrl = /^https:\/\/(www\.)?instagram\.com\/.+/;
    const isFacebookUrl = /^https:\/\/(www\.)?facebook\.com\/.+/;

    if (!name.ge.trim()) errors.name = t("nameRequired");
    if (!email.trim()) errors.email = t("emailRequired");
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = t("invalidEmail");

    if (!phone.trim()) errors.phone = t("phoneRequired");
    else if (!/^\+?\d{7,15}$/.test(phone)) errors.phone = t("invalidPhone");

    if (!behance.trim()) errors.behance = t("behanceRequired");
    else if (!isBehanceUrl.test(behance)) errors.behance = t("invalidBehance");

    if (!instagram.trim()) errors.instagram = t("instagramRequired");
    else if (!isInstagramUrl.test(instagram))
      errors.instagram = t("invalidInstagram");

    if (!facebook.trim()) errors.facebook = t("facebookRequired");
    else if (!isFacebookUrl.test(facebook))
      errors.facebook = t("invalidFacebook");

    if (profilePhoto && profilePhoto.size > maxSize)
      errors.profilePhoto = t("maxSizeErroProfilePhoto");

    if (projectPhoto && projectPhoto.size > maxSize)
      errors.projectPhoto = t("maxSizeErroProjectPhoto");

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
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

  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage({ text: "", variant: "" });

    const isValid = validateForm(); // This sets fieldErrors
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    // Extra protection: check size again in case user injected image manually
    const newFieldErrors = { ...fieldErrors };

    if (profilePhoto && profilePhoto.size > maxSize) {
      newFieldErrors.profilePhoto = t("maxSizeErroProfilePhoto");
    }

    if (projectPhoto && projectPhoto.size > maxSize) {
      newFieldErrors.projectPhoto = t("maxSizeErroProjectPhoto");
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name[ge]", name.ge);
    formData.append("facebook", facebook);
    formData.append("instagram", instagram);
    formData.append("behance", behance);
    formData.append("companyPerson", companyPerson);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("role", "user");

    if (profilePhoto) formData.append("profileImage", profilePhoto);
    if (projectPhoto) formData.append("projectImage", projectPhoto);

    try {
      const response = await createDesigner(formData).unwrap();
      if (!response.ok) {
        setMessage({ text: t("successfullyRegistered"), variant: "success" });
        clearForm();
        setIsLoading(false);
        setProfilePhoto(null);
        setProjectPhoto(null);
      }
    } catch (error) {
      const backendMessage =
        error?.data?.message ||
        error?.error ||
        error?.message ||
        t("somethingWentWrong");

      setMessage({ text: backendMessage, variant: "danger" });
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = async () => {
  //   setIsLoading(true);
  //   setMessage({ text: "", variant: "" });

  //   const isValid = validateForm();
  //   if (!isValid) {
  //     setIsLoading(false);
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("name[ge]", name.ge);
  //   formData.append("facebook", facebook);
  //   formData.append("instagram", instagram);
  //   formData.append("behance", behance);
  //   formData.append("companyPerson", companyPerson);
  //   formData.append("phone", phone);
  //   formData.append("email", email);

  //   if (profilePhoto && profilePhoto.size <= maxSize) {
  //     formData.append("profileImage", profilePhoto);
  //   }
  //   if (projectPhoto && projectPhoto.size <= maxSize) {
  //     formData.append("projectImage", projectPhoto);
  //   }

  //   try {
  //     if (!fieldErrors.profilePhoto && !fieldErrors.projectPhoto) {
  //       await createDesigner(formData).unwrap();
  //       setMessage({ text: t("successfullyRegistered"), variant: "success" });
  //       clearForm();
  //     }
  //   } catch (error) {
  //     setMessage({ text: t("imageSizeError"), variant: "danger" });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <Container fluid className="px-0 registration-page">
      <SpaceComponent info={{ h1: t("registration") }} className="w-100" />
      <Row className="my-0 mx-0 ">
        <Col sm={12} className="mt-4 mt-md-4 mt-lg-5 px-0 d-flex justify-content-center">
          <div className="terms-inner-container">
            <button className="bg-white my-2 my-md-0 p-0 shadow mx-2 mx-lg-0">
              <a
                href="/assets/documents/designerUnionTerms.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="d-block text-secondary fs-6 py-3 px-3"
              >
                {t("terms")}
                <FontAwesomeIcon
                  className="ps-2 font"
                  icon={faArrowUpRightFromSquare}
                />
              </a>
            </button>
          </div>
        </Col>
        <Col className="d-flex justify-content-center py-4 py-lg-5">
          <Form className="registration-form p-4 p-lg-5">
            {/* Name */}
            <Col sm={12} lg={6} className="pe-lg-3">
              <FloatingLabel
                controlId="floatingInput"
                label={t("fullName")}
                className="mb-3"
              >
                <Form.Control
                  value={name.ge}
                  onChange={(e) => {
                    setName({ ge: e.target.value });
                    setFieldErrors((prev) => {
                      const { name, ...rest } = prev;
                      return rest;
                    });
                  }}
                  type="text"
                  isInvalid={!!fieldErrors.name}
                  placeholder={t("fullName")}
                />

                <Form.Control.Feedback type="invalid">
                  {fieldErrors.name}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            {/* Company / Person */}
            <Col sm={12} lg={6} className="ps-lg-3">
              <InputGroup className="mb-3 d-flex flex-row">
                <Button
                  onClick={() => setCompanyPerson("person")}
                  className={`w-50 py-3 ${
                    companyPerson === "person" && "bg-secondary text-light"
                  }`}
                  variant="outline-secondary"
                >
                  {t("person")}
                </Button>
                <Button
                  onClick={() => setCompanyPerson("company")}
                  className={`w-50 ${
                    companyPerson === "company" && "bg-secondary text-light"
                  }`}
                  variant="outline-secondary"
                >
                  {t("company")}
                </Button>
              </InputGroup>
            </Col>

            {/* Email */}
            <Col sm={12} lg={6} className="pe-lg-3">
              <FloatingLabel
                controlId="floatingEmail"
                label={t("email")}
                className="mb-3"
              >
                <Form.Control
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors((prev) => {
                      const { email, ...rest } = prev;
                      return rest;
                    });
                  }}
                  type="email"
                  isInvalid={!!fieldErrors.email}
                  placeholder={t("email")}
                />
                <Form.Control.Feedback type="invalid">
                  {fieldErrors.email}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            {/* Phone */}
            <Col sm={12} lg={6} className="ps-lg-3 mb-3">
              <FloatingLabel
                controlId="floatingPhone"
                label={t("phoneNumber")}
                className="mb-0"
              >
                <Form.Control
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setFieldErrors((prev) => {
                      const { phone, ...rest } = prev;
                      return rest;
                    });
                  }}
                  type="tel"
                  isInvalid={!!fieldErrors.phone}
                  placeholder={t("phoneNumber")}
                />
                <Form.Control.Feedback type="invalid">
                  {fieldErrors.phone}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            {/* Profile Photo */}
            <Col sm={12} lg={6} className="pe-lg-3">
              <FloatingLabel
                label={
                  fieldErrors.profilePhoto
                    ? t("uploadProfilePhoto")
                    : profilePhoto
                    ? t("uploadedProfilePhoto")
                    : t("uploadProfilePhoto")
                }
                className={` upload-label ${
                  fieldErrors.profilePhoto
                    ? "is-invalid border border-danger rounded-2"
                    : profilePhoto
                    ? "border border-success rounded-2"
                    : ""
                }`}
              >
                <div className="custom-file-upload upload-registration-photo py-2">
                  <div
                    className="form-control custom-file-button"
                    onClick={() =>
                      document.getElementById("profilePhotoInput").click()
                    }
                  >
                    {profilePhoto?.name || t("clickToUpload")}
                  </div>
                  <Form.Control
                    id="profilePhotoInput"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    style={{ display: "none" }}
                    isInvalid={!!fieldErrors.profilePhoto}
                  />
                </div>
              </FloatingLabel>
              <Form.Control.Feedback type="invalid" className="mb-0">
                {fieldErrors.profilePhoto}
              </Form.Control.Feedback>
            </Col>

            {/* Project Photo */}
            <Col sm={12} lg={6} className="py-3 ps-lg-3 py-lg-0">
              <FloatingLabel
                label={
                  fieldErrors.projectPhoto
                    ? t("uploadProjectsPhoto")
                    : projectPhoto
                    ? t("uploadedProjectsPhoto")
                    : t("uploadProjectsPhoto")
                }
                className={` upload-label ${
                  fieldErrors.projectPhoto
                    ? "is-invalid border border-danger rounded-2"
                    : projectPhoto
                    ? "border border-success rounded-2"
                    : ""
                }`}
              >
                <div className="custom-file-upload upload-registration-photo py-2">
                  <div
                    className="form-control custom-file-button"
                    onClick={() =>
                      document.getElementById("projectPhotoInput").click()
                    }
                  >
                    {projectPhoto?.name || t("clickToUpload")}
                  </div>
                  <Form.Control
                    id="projectPhotoInput"
                    type="file"
                    accept="image/*"
                    onChange={handleProjectPhotoChange}
                    style={{ display: "none" }}
                    isInvalid={!!fieldErrors.projectPhoto}
                  />
                </div>
              </FloatingLabel>
              <Form.Control.Feedback type="invalid" className="mb-0">
                {fieldErrors.projectPhoto}
              </Form.Control.Feedback>
            </Col>

            {/* Social Links */}
            <Col sm={12} lg={4}>
              <FloatingLabel
                controlId="floatingBehance"
                label="Behance / Website"
                className="mb-3"
              >
                <Form.Control
                  value={behance}
                  onChange={(e) => {
                    setBehance(e.target.value);
                    setFieldErrors((prev) => {
                      const { behance, ...rest } = prev;
                      return rest;
                    });
                  }}
                  type="url"
                  isInvalid={!!fieldErrors.behance}
                  placeholder="exp: https://www.behance.net/username"
                />
                <Form.Control.Feedback type="invalid">
                  {fieldErrors.behance}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col sm={12} lg={4} className="px-lg-3">
              <FloatingLabel
                controlId="floatingInstagram"
                label="Instagram link"
                className="mb-3"
              >
                <Form.Control
                  value={instagram}
                  onChange={(e) => {
                    setInstagram(e.target.value);
                    setFieldErrors((prev) => {
                      const { instagram, ...rest } = prev;
                      return rest;
                    });
                  }}
                  type="url"
                  isInvalid={!!fieldErrors.instagram}
                  placeholder="Instagram link"
                />
                <Form.Control.Feedback type="invalid">
                  {fieldErrors.instagram}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col sm={12} lg={4}>
              <FloatingLabel
                controlId="floatingFacebook"
                label="Facebook link"
                className="mb-3"
              >
                <Form.Control
                  value={facebook}
                  onChange={(e) => {
                    setFacebook(e.target.value);
                    setFieldErrors((prev) => {
                      const { facebook, ...rest } = prev;
                      return rest;
                    });
                  }}
                  type="url"
                  isInvalid={!!fieldErrors.facebook}
                  placeholder="Facebook link"
                />
                <Form.Control.Feedback type="invalid">
                  {fieldErrors.facebook}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            {/* Card Preview */}
            <Col
              sm={12}
              className="d-flex justify-content-center registration-page-designer-card mb-3"
            >
              <DesignerCardComponent
                name={name.ge}
                profilePhoto={profilePhoto}
                projectPhoto={projectPhoto}
                behance={behance}
                instagram={instagram}
                facebook={facebook}
              />
            </Col>

            {/* Submit */}
            <Col sm={12} lg={4} className="px-lg-3">
              <Button
                className="bg-black border-0 py-3 fw-bold registration-button w-100"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  t("submit")
                )}
              </Button>
            </Col>
            {/* Message */}
            <Col sm={12}>
              {message.text && (
                <Alert variant={message.variant} className="mt-3">
                  {message.text}
                </Alert>
              )}
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
