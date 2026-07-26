import React, { useState, useEffect } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import SpaceComponent from "../../components/SpaceComponent";
import { useTranslation } from "react-i18next";
import { useGetAboutUsQuery } from "../../data/aboutUsSlice";
import { useGetTeamMembersQuery } from "../../data/apiTeamSlice";
import { useLocalStorage } from "../../context/LocalStorageContext";

const AboutUs = () => {
  const { localStorageData, updateLocalStorageData } = useLocalStorage();
  const localAboutUsData = localStorageData.aboutUs;
  const localTeamMembers = localStorageData.allTeamMembers;

  const { t, i18n } = useTranslation();
  const { data: aboutUsData } = useGetAboutUsQuery();
  const { data: teamData } = useGetTeamMembersQuery();

  const [imageSrc, setImageSrc] = useState("");

  // ---------- helpers ----------
  const isDataDifferent = (localData, serverData) => {
    if (!localData || !serverData) return true;
    if (localData.length !== serverData.length) return true;
    return JSON.stringify(localData) !== JSON.stringify(serverData);
  };

  // ---------- sync AboutUs ----------
  useEffect(() => {
    if (aboutUsData && isDataDifferent(localAboutUsData, aboutUsData)) {
      updateLocalStorageData("aboutUs", aboutUsData);
    }
  }, [aboutUsData, localAboutUsData]);

  useEffect(() => {
    if (localAboutUsData && localAboutUsData[0]?.image?.length > 0) {
      setImageSrc(localAboutUsData[0].image[0]);
    }
  }, [localAboutUsData]);

  // ---------- sync Team ----------
  useEffect(() => {
    if (teamData && isDataDifferent(localTeamMembers, teamData)) {
      updateLocalStorageData("allTeamMembers", teamData);
    }
  }, [teamData, localTeamMembers]);

  // ---------- sanitize ----------
  const sanitizeHtml = (input) => {
    if (typeof input !== "string") return input;

    let result = input.replace(/ style="[^"]*"/g, "");
    result = result.replace(/<br>/g, "<br/> </br>");

    const allowedTags = ["ul", "ol", "li", "strong", "br"];
    result = result.replace(/<\/?([a-zA-Z0-9]+)[^>]*>/g, (match, tag) =>
      allowedTags.includes(tag.toLowerCase()) ? match : "",
    );

    result = result.replace(/\n/g, "\\n").replace(/\t/g, "\\t");

    return `<img src="${imageSrc}" class="aboutUs-page-image mb-3 ms-lg-3" alt="aboutUs Image"/> ${result}`;
  };

  // ---------- team split ----------
  const featuredMember =
    localTeamMembers
      ?.filter((m) => m.type === "featured")
      ?.sort((a, b) => a.order - b.order)[0] || null;

  const boardMembers =
    localTeamMembers?.filter((m) => m.type === "board") || [];

  // ---------- render ----------
  return (
    <Container
      fluid
      className="about-us-page px-0 d-flex flex-column align-items-center justify-content-start"
    >
      <SpaceComponent info={{ h1: t("aboutUs") }} className="w-100" />

      {/* ABOUT TEXT */}
      <Row className="about-us-page-inner-container my-3 my-md-5 py-4 px-2">
        <Col sm={12}>
          {localAboutUsData && (
            <p
              className="about-us-page-p"
              lang={i18n.language === "en" ? "en" : "ka"}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(localAboutUsData[0]?.text[i18n.language]),
              }}
            />
          )}
        </Col>
      </Row>

      {/* FEATURED MEMBER */}
      <Row className="about-us-page-inner-container my-3 my-md-5 py-4 px-2">
        <Col sm={12}>
          <h3 className="mb-4 fw-bold fs-4">{t("ourTeam")}</h3>
        </Col>

        {/* team section using real data */}
        {featuredMember && (
          <>
            <Col
              sm={12}
              className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between px-lg-2 gap-4 gap-md-3 pe-2 pe-md-2 pe-lg-2"
            >
              {/* left side big image */}
              <Col sm={12} md={7} lg={6}>
                <img
                  className="max-h-80 ratio aspect-1x1  px-2 px-md-0 object-fit-cover"
                  src={featuredMember.image}
                  alt={featuredMember.name[i18n.language]}
                />
              </Col>

              {/* right side text + bullets */}
              <Col
                sm={12}
                md={4}
                lg={5}
                className="president-text-container px-2 pt-3 pb-1 px-md-3 pt-4 pb-md-2 px-lg-4 pt-3 pb-1"
              >
                <div className="me-2">
                  <h5 className="president-name">
                    {featuredMember.name[i18n.language]}
                  </h5>
                  <p className="about-us-page-p fw-bold president-title">
                    {featuredMember.position[i18n.language]}
                  </p>
                  <hr className="w-25" />
                  {featuredMember.description?.[i18n.language] && (
                    <p className="about-us-page-p ">
                      {featuredMember.description?.[i18n.language]}
                    </p>
                  )}
                  {featuredMember.responsibilities?.[i18n.language] && (
                    <ul className="ps-3 about-us-page-p">
                      {featuredMember.responsibilities[i18n.language].map(
                        (item, idx) => (
                          <li key={idx}>{item}</li>
                        ),
                      )}
                    </ul>
                  )}
                </div>
              </Col>
            </Col>

            {/* Board members */}
            <Col sm={12} className="pt-5">
              <h3 className="fs-4 fw-semibold">{t("boardMembers")}</h3>
            </Col>

            {boardMembers.map((member) => (
              <Col
                key={member._id}
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xxl={3}
                className="pt-3 rounded-0"
              >
                <Card className="pb-0 border-0 board-members-cards rounded-0">
                  <Card.Img
                    className="rounded-0"
                    variant="top"
                    src={member.image}
                    alt={member.name[i18n.language]}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      aspectRatio: "1/1",
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="fs-6 fw-semibold">
                      {member.name[i18n.language]}
                    </Card.Title>
                    <Card.Text className="board-members-position">
                      {member.position[i18n.language]}
                    </Card.Text>
                    {member.shortDescription?.[i18n.language] && (
                      <Card.Text className="about-us-page-p ">
                        {member.shortDescription[i18n.language]}
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
};

export default AboutUs;
