// src/adminPages/components/AdminNavbar.js
import React, { useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useTranslation } from "react-i18next";

const AdminNavbar = () => {
  const flagGe = require("../../images/flags/georgia.png");
  const flagUk = require("../../images/flags/uk.png");
  const { logout } = useAuth(); // Access the logout function
  const navigate = useNavigate(); // Get the navigate function
  const { i18n } = useTranslation();

  const [toggleLang, setTogglelang] = useState(
    localStorage.getItem("language") || i18n.language
  );
  // const []

  const handleLangChange = (lang) => {
    setTogglelang(i18n.language === "ge" ? "en" : "ge");
    i18n.changeLanguage(toggleLang === "ge" ? "en" : "ge");
    localStorage.setItem("language", toggleLang === "ge" ? "en" : "ge");
  };

  const handleLogout = () => {
    logout(navigate); // Pass navigate to logout
  };

  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="NEWS" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/admin/add-news">
                ADD
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/all-news">
                All NEWS
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="HERO" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/admin/add-hero">
                ADD HERO
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/all-heros">
                All HEROS
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="PARTNERS" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="add-partner">
                ADD PARTNERS
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="all-partners">
                ALL PARTNERS
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Blog" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="add-blog">
                ADD Blog
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="all-blogs">
                ALL Blogs
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="DESIGNERS" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="add-designer">
                ADD DESIGNER
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="all-designers">
                ALL DESIGNERS
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="all-designers-info">
                ALL DESIGNERS INFO
              </NavDropdown.Item>
              {/* ...other dropdown items */}
            </NavDropdown>
            <NavDropdown title="PROJECTS" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="add-projects">
                ADD PROJECTS
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="all-projects">
                ALL PROJECTS
              </NavDropdown.Item>
              {/* ...other dropdown items */}
            </NavDropdown>
            <NavDropdown title="Abouts Us" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="add-about-us">
                ADD AboutUs
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="edit-about-us">
                EDIT AboutUs
              </NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to="add-about-us-main-page">
                add MainPage
              </NavDropdown.Item> */}
              <NavDropdown.Item as={Link} to="edit-about-us-main-page">
                EDIT AboutUsMainPage
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="team/add">
                Add team member
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="team">
                Edit team member
              </NavDropdown.Item>
              {/* ...other dropdown items */}
            </NavDropdown>
          </Nav>
          <Button
            onClick={() => handleLangChange()}
            className="p-1 py-1 border-0 flag-button"
          >
            <img src={toggleLang === "en" ? flagUk : flagGe} alt="flag " />
          </Button>
        </Navbar.Collapse>
        <Button onClick={handleLogout} variant="outline-danger">
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
