import React, { useEffect, useState } from "react";
import { Nav, Navbar, Offcanvas, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import useScreenWidth from "../hooks/useScreenWidth";

const NavbarComponent = () => {
  const flagGe = require("../images/flags/georgia.png");
  const flagUk = require("../images/flags/uk.png");
  // const screenWidth = useScreenWidth();
  const { t, i18n } = useTranslation();
  const pathname = useLocation().pathname;

  const [toggleLang, setTogglelang] = useState(
    localStorage.getItem("language") || i18n.language
  );
  const [showOffcanvas, setShowOffcanvas] = useState(false); // State to control Offcanvas visibility

  const handleLangChange = () => {
    const newLang = toggleLang === "ge" ? "en" : "ge";
    setTogglelang(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  useEffect(() => {
    if (i18n.language === "ge") {
      document.querySelectorAll(".navbar-link")?.forEach((el) => {
        // el.style.fontSize = '1rem !important'
      });
    }
  });

  return (
    <Navbar
      sticky="top"
      expand="lg"
      className="bg-body-tertiary my-0 py-2 py-lg-0"
    >
      <Container fluid className="my-0">
        <Navbar.Brand className="ms-0 ms-lg-3 py-0" as={Link} to="/">
          <img
            className="navbar-logo py-0 my-1 my-lg-2 my-xl-3"
            src={`${
              i18n.language === "ge"
                ? "/union-logo2.3.png"
                : "/union-logo2.2.png"
            }`}
            alt="Union Logo"
          />
          {/* <h1 className="mb-0">{t("designersUnion")}</h1> */}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-lg`}
          onClick={handleShowOffcanvas}
        />
        <Navbar.Offcanvas
          className="mb-0 px-3 px-lg-0"
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
          show={showOffcanvas}
          onHide={handleCloseOffcanvas}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg `}>
              {t("menu")}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="mb-0">
            <Nav className="justify-content-end flex-grow-1  pe-0 pe-lg-3 column-gap-1 column-gap-lg-0 column-gap-xl-1 column-gap-xxl-2">
              <Nav.Link
                as={Link}
                to="/"
                onClick={handleCloseOffcanvas}
                className={`${pathname === "/" && "text-dark fw-bold"}`}
              >
                {t("main")}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/aboutUs"
                onClick={handleCloseOffcanvas}
                className={`${pathname === "/aboutUs" && "text-dark fw-bold"}`}
              >
                {t("aboutUs")}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/news"
                onClick={handleCloseOffcanvas}
                className={`${
                  pathname.includes("/news") && "text-dark fw-bold"
                }`}
              >
                {t("news")}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/designers"
                onClick={handleCloseOffcanvas}
                className={`${
                  pathname === "/designers" && "text-dark fw-bold"
                }`}
              >
                {t("designers")}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/projects"
                onClick={handleCloseOffcanvas}
                className={`${
                  pathname.includes("/projects") && "text-dark fw-bold"
                }`}
              >
                {t("projects")}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/blog"
                onClick={handleCloseOffcanvas}
                className={`${
                  pathname.includes("/blogs") && "text-dark fw-bold"
                }`}
              >
                {t("blog")}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/partners"
                onClick={handleCloseOffcanvas}
                className={`${pathname === "/partners" && "text-dark fw-bold"}`}
              >
                {t("partners")}
              </Nav.Link>

              {/* <NavDropdown title={t("registration")} id="basic-nav-dropdown" className="d-flex flex-column  justify-content-center  ">
                <NavDropdown.Item
                  onClick={handleCloseOffcanvas}
                  as={Link}
                  to="/registration"
                >
                  {t("registration")}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={handleCloseOffcanvas}
                  as={Link}
                  to="/bookVisit"
                >
                  {t("bookVisit")}
                </NavDropdown.Item>
              </NavDropdown> */}
              <Nav.Link
                as={Link}
                to="/registration"
                onClick={handleCloseOffcanvas}
                className={`${
                  pathname === "/registration" && "text-dark fw-bold"
                }`}
              >
                {t("registration")}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact"
                onClick={handleCloseOffcanvas}
                className={`${pathname === "/contact" && "text-dark fw-bold"}`}
              >
                {t("contact")}
              </Nav.Link>
              {/* <Nav.Link as={Link} to="/login" onClick={handleCloseOffcanvas}>
                LOGIN
              </Nav.Link> */}
              <Button
                onClick={() => handleLangChange()}
                className="p-1 py-1 border-0 flag-button"
              >
                <img src={toggleLang === "en" ? flagUk : flagGe} alt="flag" />
              </Button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
