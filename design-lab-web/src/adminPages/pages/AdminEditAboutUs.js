import React, { useState, useRef, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
} from "../../data/aboutUsSlice";
import { Col, Container, Row, Toast } from "react-bootstrap";

const JoditEditor = React.lazy(() => import("jodit-react"));

const AdminEditAboutUs = () => {
  const { data, isLoading, error, refetch } = useGetAboutUsQuery();
  const [updateAboutUs] = useUpdateAboutUsMutation();

  const editorRefEn = useRef(null);
  const editorRefGe = useRef(null);
  const [editorContentGe, setEditorContentGe] = useState("");
  const [editorContentEn, setEditorContentEn] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [oldImageSrc, setOldImageSrc] = useState("");
  const [startLoading, setStartLoading] = useState(false)
  const [id, setId] = useState(null);

  const fileInputRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    if (data) {
      setEditorContentGe(data[0]?.text.ge);
      setEditorContentEn(data[0]?.text.en);
      setOldImageSrc(data[0]?.image[0]);
      setId(data[0]?._id);
    }
  }, [data]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    // console.log(imageFile);
  };

  const handleSubmit = async () => {
    setStartLoading(true)
    try {
      //   const formData = new FormData();
      const enText = editorRefEn?.current.value;
      const geText = editorRefGe?.current.value;
      //   if (imageFile) {
      //     formData.append("images", imageFile); // Append images for upload
      //   }
      //   formData.append("text[en]", enText);
      //   formData.append("text[ge]", geText);
    //   console.log(imageFile);
      const response = await updateAboutUs({
        id,
        enText,
        geText,
        imageFile,
      }).unwrap();
      if(response._id) {
        alert('Success !')
        refetch()
        setStartLoading(false)
      }
    } catch (error) {
      alert(error)
      setStartLoading(false)
    }
  };

//   console.log(data);
  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      url: "https://design-union-server.onrender.com/api/upload",
      format: "json",
      method: "PATCH",
      process: (resp) => ({
        files: [resp.url],
      }),
    },
    buttons: [
      "bold",
      "italic",
      "underline",
      "link",
      "ul",
      "ol",
      "image",
      "align",
      "undo",
      "redo",
      "hr",
    ],
    minHeight: 400,
  };
  return (
    <Container className="pt-5 admin-about-us">
      <h2 className="pb-3">განაახლე ჩვენს შესახებ</h2>
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
      <div className="admin-add-about-us-jodit-container">
        <label>Content (Georgian)</label>
        {/* Suspense is used to wrap the lazy-loaded component */}
        <Suspense fallback={<div>Loading Editor...</div>}>
          <JoditEditor
            ref={editorRefGe}
            value={editorContentGe}
            config={config}
            onBlur={(newContent) => setEditorContentGe(newContent)}
          />
        </Suspense>
      </div>
      <div className="admin-add-about-us-jodit-container">
        <label>Content (English)</label>
        {/* Suspense is used to wrap the lazy-loaded component */}
        <Suspense fallback={<div>Loading Editor...</div>}>
          <JoditEditor
            ref={editorRefEn}
            value={editorContentEn}
            config={config}
            onBlur={(newContent) => setEditorContentEn(newContent)}
          />
        </Suspense>
      </div>
      <Col sm={3}>
        {startLoading &&<p>Loading ...</p>}
        <button disabled={startLoading} onClick={handleSubmit} className="w-100 ms-4 my-3 bg-success">Save</button>
      </Col>
    </Container>
  );
};

export default AdminEditAboutUs;
