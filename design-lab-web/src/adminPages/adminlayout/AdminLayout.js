import React from "react";
import { Container } from "react-bootstrap";
import AdminNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";
// import AdminDashboard from "../AdminDashboard";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <Container className="Admin px-0 mb-0 w-100" fluid>
        <Outlet />
      </Container>
    </>
  );
};

export default AdminLayout;
