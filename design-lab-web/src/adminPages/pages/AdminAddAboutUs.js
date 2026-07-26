import React, { useState, useRef, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useCreateAboutUsMutation } from "../../data/aboutUsSlice";

// Lazy load the JoditEditor
const JoditEditor = React.lazy(() => import("jodit-react"));

const AdminAddAboutUs = () => {
  const editorRefEn = useRef(null);
  const editorRefGe = useRef(null);
  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  const [createAboutUs] = useCreateAboutUsMutation();
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const enText = editorRefEn?.current.value;
      const geText = editorRefGe?.current.value;

      formData.append("images", imageFile); // Append images for upload
      formData.append("text[en]", enText);
      formData.append("text[ge]", geText);
      const response = await createAboutUs(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      url: "https://design-union-server.onrender.com/api/upload",
      format: "json",
      method: "POST",
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
    <div>
      <h2>დაამატე ჩვენს შესახებ</h2>
      <div>
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
        <label>{t("Content (Georgian)")}</label>
        {/* Suspense for lazy loading the JoditEditor */}
        <Suspense fallback={<div>Loading editor...</div>}>
          <JoditEditor ref={editorRefGe} config={config} />
        </Suspense>
      </div>
      <div className="admin-add-about-us-jodit-container">
        <label>{t("Content (English)")}</label>
        {/* Suspense for lazy loading the JoditEditor */}
        <Suspense fallback={<div>Loading editor...</div>}>
          <JoditEditor ref={editorRefEn} config={config} />
        </Suspense>
      </div>
      <div>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default AdminAddAboutUs;
