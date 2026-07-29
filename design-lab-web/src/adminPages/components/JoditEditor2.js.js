import React, { useState, useRef, Suspense } from "react";
import { useCreateNewsMutation } from "../../data/newsSlice2";
import { useTranslation } from "react-i18next";
import { useCreateBlogsMutation } from "../../data/blogSlice";

// Lazy load the JoditEditor
const JoditEditor = React.lazy(() => import("jodit-react"));

const JoditEditorComponent = ({ parentComponent }) => {
  const [title, setTitle] = useState({ en: "", ge: "" });
  const [imageFiles, setImageFiles] = useState([]);
  const editorRefEn = useRef(null);
  const editorRefGe = useRef(null);
  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  const [createNews] = useCreateNewsMutation();
  const [createBlog] = useCreateBlogsMutation();

  const handleTitleChange = (lang, e) => {
    setTitle((prev) => ({
      ...prev,
      [lang]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const editorContentEn = editorRefEn.current?.value || "";
    const editorContentGe = editorRefGe.current?.value || "";

    if (!editorContentEn || !editorContentGe) {
      alert("Please provide content in both English and Georgian.");
      return;
    }

    const formData = new FormData();
    formData.append("title[en]", title.en);
    formData.append("title[ge]", title.ge);
    formData.append("text[en]", editorContentEn);
    formData.append("text[ge]", editorContentGe);

    imageFiles.forEach((file) => {
      formData.append("images", file); // Append images for upload
    });

    try {
      const response =
        parentComponent === "news"
          ? await createNews(formData).unwrap()
          : await createBlog(formData).unwrap();
      alert(`${parentComponent} saved successfully!`);
      handleClearContent();
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Failed to save content: " + (error.data?.message || error.message),
      );
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => {
      const updatedFiles = [...prev, ...files];
      console.log("Selected images:", updatedFiles); // Log updated files
      return updatedFiles; // Return updated state
    });
  };

  const handleClearContent = () => {
    setTitle({ en: "", ge: "" });
    setImageFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (editorRefEn.current) editorRefEn.current.value = "";
    if (editorRefGe.current) editorRefGe.current.value = "";
  };

  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      url: `${process.env.REACT_APP_BASE_URL}upload`,
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
    <div className="joditComponent-container">
      <label htmlFor="titleGe">{t("Title (Georgian)")}</label>
      <input
        id="titleGe"
        type="text"
        placeholder={t("Title (Georgian)")}
        value={title.ge}
        onChange={(e) => handleTitleChange("ge", e)}
        className="form-control mb-3"
      />

      <label htmlFor="image">Upload Images</label>
      <input
        id="image"
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleImageChange}
        className="form-control mb-3"
      />

      {/* Preview uploaded images */}
      <div>
        {imageFiles.length > 0 && (
          <div className="image-preview">
            {imageFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                style={{ width: "100px", marginRight: "10px" }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="editor-section">
        <label>{t("Content (Georgian)")}</label>
        {/* Suspense for lazy loading the JoditEditor */}
        <Suspense fallback={<div>Loading editor...</div>}>
          <JoditEditor ref={editorRefGe} config={config} />
        </Suspense>
      </div>

      <label htmlFor="titleEn">{t("Title (English)")}</label>
      <input
        id="titleEn"
        type="text"
        placeholder={t("Title (English)")}
        value={title.en}
        onChange={(e) => handleTitleChange("en", e)}
        className="form-control mb-3"
      />

      <div className="editor-section">
        <label>{t("Content (English)")}</label>
        {/* Suspense for lazy loading the JoditEditor */}
        <Suspense fallback={<div>Loading editor...</div>}>
          <JoditEditor ref={editorRefEn} config={config} />
        </Suspense>
      </div>

      <div className="mt-3">
        <button onClick={handleSubmit} className="btn btn-primary">
          {parentComponent === "news" ? "Save News Article" : "Save Blog"}
        </button>
        <button onClick={handleClearContent} className="btn btn-secondary ms-2">
          Clear Content
        </button>
      </div>
    </div>
  );
};

export default JoditEditorComponent;
