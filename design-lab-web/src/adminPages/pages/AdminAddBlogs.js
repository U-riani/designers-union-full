import React, { Suspense, lazy } from "react";
import { Container, Spinner } from "react-bootstrap";

// Lazy load JoditEditorComponent2
const JoditEditorComponent2 = lazy(() => import("../components/JoditEditor2.js.js"));

const AdminAddBlogs = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center flex-wrap">
      <h1 className="mb-4">Add Blog</h1>

      {/* Suspense with a fallback UI (spinner while loading) */}
      <Suspense fallback={<Spinner animation="border" role="status" />}>
        <JoditEditorComponent2 parentComponent={"blog"}/>
      </Suspense>
    </Container>
  );
};

export default AdminAddBlogs;
