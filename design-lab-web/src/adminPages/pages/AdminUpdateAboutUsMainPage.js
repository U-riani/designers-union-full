import React, { useState, useRef, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetAboutUsMainPageQuery,
  useUpdateAboutUsMainPageMutation,
} from "../../data/aboutUsSlice";
import { Col, Container, Row, Toast } from "react-bootstrap";

// const JoditEditor = React.lazy(() => import("jodit-react"));

const AdminEditAboutUsMainPage = () => {
  const { data, isLoading, error, refetch } = useGetAboutUsMainPageQuery();
  const [updateAboutUsMainPage] = useUpdateAboutUsMainPageMutation();

  const editorRefEn = useRef(null);
  const editorRefGe = useRef(null);
  const [editorContentGe, setEditorContentGe] = useState("");
  const [editorContentEn, setEditorContentEn] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [oldImageSrc, setOldImageSrc] = useState("");
  const [startLoading, setStartLoading] = useState(false);
  const [id, setId] = useState(null);

  const fileInputRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setEditorContentGe(data[0].text.ge);
      setEditorContentEn(data[0].text.en);
      setOldImageSrc(data[0].image[0] || "");
      setId(data[0]._id);
    }
  }, [data]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    // console.log(imageFile);
  };

  const handleSubmit = async () => {
    setStartLoading(true);
    try {
      const enText = editorContentEn; // Get the value directly from state
      const geText = editorContentGe; // Get the value directly from state
  
      const response = await updateAboutUsMainPage({
        id,
        enText,
        geText,
        imageFile,
      }).unwrap();
  
      if (response._id) {
        alert("Success!");
        refetch();
        setStartLoading(false);
      }
    } catch (error) {
      alert(error);
      setStartLoading(false);
    }
  };
  

  return (
    <Container className="pt-5 admin-about-us">
      <h2 className="pb-3">განაახლე ჩვენს შესახებ მთავარ გვერდზე</h2>
      <Col sm={8}>
        <div className="h-50 admin-about-us-image-container">
          <img className="object-cover w-100 h-100" src={oldImageSrc} alt="" />
        </div>
      </Col>
      <div className="my-3">
        <label htmlFor="image">Upload Images</label>
        <input
          id="image"
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
          className="form-control mb-3"
        />
      </div>
      <div className="d-flex flex-column mb-3">
        <label>Content (Georgian)</label>
        {/* Suspense is used to wrap the lazy-loaded component */}
        <textarea
          name="ge-aboutus-main-page"
          id="ge-about-us-main-page"
          rows={5}
          value={editorContentGe}
          onChange={(e) => setEditorContentGe(e.target.value)} // Correct usage
        ></textarea>
      </div>
      <div className=" d-flex flex-column">
        <label>Content (English)</label>
        {/* Suspense is used to wrap the lazy-loaded component */}
        <textarea
          name="en-aboutus-main-page"
          id="en-about-us-main-page"
          rows={5}
          value={editorContentEn}
          onChange={(e) => setEditorContentEn(e.target.value)} // Correct usage
        ></textarea>
      </div>
      <Col sm={3}>
        {startLoading && <p>Loading ...</p>}
        <button
          disabled={startLoading}
          onClick={handleSubmit}
          className="w-100 ms-4 my-3 bg-success"
          
        >
          Save
        </button>
      </Col>
    </Container>
  );
};

export default AdminEditAboutUsMainPage;
