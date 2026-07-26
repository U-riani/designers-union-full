import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Col } from "react-bootstrap";
import {
  faBehance,
  faInstagram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const DesignerCardComponent = ({
  projectPhoto,
  profilePhoto,
  name,
  behance,
  facebook,
  instagram,
}) => {
  // console.log(profilePhoto);
  const { t } = useTranslation();

  const [item, setItem] = useState({
    projectPhoto: projectPhoto || "",
    profilePhoto: profilePhoto || "",
    name: name || t("fullName"),
    behance: "",
    facebook: "",
    instagram: "",
  });

  useEffect(() => {
    setItem((prev) => ({
      ...prev,
      ...(projectPhoto && { projectPhoto }), // Update only if projectPhoto exists
      ...(profilePhoto && { profilePhoto }), // Update only if profilePhoto exists
      ...(name && { name }), // Update only if name exists
      ...(behance && { behance }), // Update only if behance exists
      ...(facebook && { facebook }), // Update only if facebook exists
      ...(instagram && { instagram }),
    }));
  }, [projectPhoto, profilePhoto, name, behance, facebook, instagram]);

  return (
    <Col
      xs={12}
      sm={6}
      lg={4}
      xl={4}
      className="designersPage-card-col py-3 d-flex justify-content-center align-items-center"
    >
      <Card className="designersPage-card">
        <div className="designersPage-cards-images-top">
          <div className="designersPage-background-image-container bg-dark">
            <Card.Img
              src={
                item.projectPhoto
                  ? URL.createObjectURL(item.projectPhoto)
                  : null
              }
            />
          </div>
          <div className="designersPage-designer-image-container bg-secondary">
            <Card.Img
              className="object-fit-cover"
              src={
                item.profilePhoto
                  ? URL.createObjectURL(item.profilePhoto)
                  : null
              }
            />
          </div>
        </div>
        <Card.Body className="designersPage-card-body text-white">
          <Card.Title className="text-center">{item.name}</Card.Title>
          <Card.Text>{item.text}</Card.Text>
          <ButtonGroup
            aria-label="designersPage-button-group"
            className="designersPage-button-group pb-2"
          >
            <Button
              href={`${item.behance}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-link"
              variant="secondary"
            >
              <div>
                <FontAwesomeIcon icon={faBehance} />
              </div>
            </Button>
            <Button
              href={`${item.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-link"
              variant="secondary"
            >
              <div>
                <FontAwesomeIcon icon={faFacebookF} />
              </div>
            </Button>
            <Button
              href={`${item.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-link"
              variant="secondary"
            >
              <div>
                <FontAwesomeIcon icon={faInstagram} />
              </div>
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DesignerCardComponent;
