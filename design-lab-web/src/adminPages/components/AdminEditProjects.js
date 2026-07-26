import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import {
  useGetSingleProjectsQuery,
  useUpdateProjectsMutation,
} from "../../data/projectsSlice";
import AdminProjectsHeroDataComponent from "./AdminProjectsHeroDataComponent";
import AdminProjectDescription from "./AdminProjectsDescription";

const AdminEditProjects = ({ projectId }) => {
  const { data: projectData } = useGetSingleProjectsQuery(projectId);

  return (
    <Container>
      <Row>
        <Col>
          <h2>Edit Project</h2>
          <AdminProjectDescription data={projectData} />
          <AdminProjectsHeroDataComponent data={projectData} />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminEditProjects;
