import React, { useState, useRef, useEffect, Suspense } from "react";
import { useUpdateNewsMutation } from "../../data/newsSlice2";
import { useParams } from "react-router-dom";
import { useUpdateBlogsMutation } from "../../data/blogSlice";

// Lazy load the JoditEditor component
const JoditEditor = React.lazy(() => import("jodit-react"));

const JoditUpdateEditor = ({ data, parentComponent }) => {
  const [titleGe, setTitleGe] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [existingImages, setExistingImages] = useState([]); // Store existing images
  const [newImages, setNewImages] = useState([]); // Store new images to be added
  const [editorContentGe, setEditorContentGe] = useState("");
  const [editorContentEn, setEditorContentEn] = useState("");
  const editorRefGe = useRef(null);
  const editorRefEn = useRef(null);
  const fileInputRef = useRef(null);

  const [updateNews] = useUpdateNewsMutation();
  const [updateBlog] = useUpdateBlogsMutation();

  useEffect(() => {
    if (data) {
      setTitleGe(data.title.ge);
      setTitleEn(data.title.en);
      setEditorContentGe(data.text.ge);
      setEditorContentEn(data.text.en);
      setExistingImages(data.images || []);
    }
  }, [data]);

  const handleTitleEnChange = (e) => setTitleEn(e.target.value);
  const handleTitleGeChange = (e) => setTitleGe(e.target.value);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = async () => {
    try {
      if (parentComponent === "blog") {
        const response = await updateBlog({
          id: data._id,
          title: { ge: titleGe, en: titleEn },
          text: { ge: editorContentGe, en: editorContentEn },
          images: newImages,
        }).unwrap();
      } else if (parentComponent === "news") {
        const response = await updateNews({
          id: data._id,
          title: { ge: titleGe, en: titleEn },
          text: { ge: editorContentGe, en: editorContentEn },
          images: newImages,
        }).unwrap();
      }
      alert(`${parentComponent} updated successfully!`);
      handleClearContent();
    } catch (error) {
      console.log("Error:", error.message);
      alert("Failed to update content: - " + error.message);
    }
  };

  const handleClearContent = () => {
    setTitleEn("");
    setTitleGe("");
    setNewImages([]);
    setEditorContentGe("");
    setEditorContentEn("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      url: `${process.env.REACT_APP_BASE_URL}upload`,
      format: "json",
      method: "POST",
      process: (resp) => ({ files: [resp.url] }),
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

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  return (
    <div className="joditComponent-container">
      <h2>Edit News Article</h2>

      <label htmlFor="titleGe">Title (Georgian)</label>
      <input
        id="titleGe"
        type="text"
        placeholder="Enter news title (Georgian)"
        value={titleGe}
        onChange={handleTitleGeChange}
        className="form-control mb-3"
      />

      <label htmlFor="image">Upload Images</label>
      <input
        id="image"
        type="file"
        ref={fileInputRef}
        multiple
        onChange={handleImageChange}
        className="form-control mb-3"
      />

      {/* Display existing and new images */}
      <div className="gela">
        <h5>Existing Images:</h5>
        {existingImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Existing"
            style={{ width: "200px", margin: "10px" }}
          />
        ))}
        <h5>New Images:</h5>
        {newImages.map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt="New"
            style={{ width: "200px", margin: "10px" }}
          />
        ))}
      </div>

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

      <label htmlFor="titleEn">Title (English)</label>
      <input
        id="titleEn"
        type="text"
        placeholder="Enter news title (English)"
        value={titleEn}
        onChange={handleTitleEnChange}
        className="form-control mb-3"
      />

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

      <div className="mt-3">
        <button onClick={handleSubmit} className="btn btn-primary">
          {parentComponent === "blog" ? "Update Blog" : "Update News Article"}
        </button>
        <button onClick={handleClearContent} className="btn btn-secondary ms-2">
          Clear Content
        </button>
      </div>
    </div>
  );
};

export default JoditUpdateEditor;
