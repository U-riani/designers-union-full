// import React, { useState, useRef } from "react";
// import JoditEditor from "jodit-react";
// import { useCreateNewsMutation } from "../../data/newsSlice2";

// const JoditEditorComponent = () => {
//   const [title, setTitle] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const editorRef = useRef(null);
//   const fileInputRef = useRef(null);

//   const [createNews, { isLoading, isSuccess, error }] = useCreateNewsMutation();

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]); // Save the actual file for upload
//   };

//   const handleSubmit = async () => {
//     const editorContent = editorRef.current.value;

//     // Prepare the FormData object
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("text", editorContent);
//     if (imageFile) {
//       formData.append("image", imageFile); // Append image file if present
//     }

//     try {
//       await createNews(formData).unwrap(); // Call the mutation
//       alert("News saved successfully!");
//       setTitle("");
//       setImageFile('');
//       editorRef.current.value = '';
//       fileInputRef.current.value = ""; // Reset editor content
//     } catch (error) {
//       console.log("error", error);
//       alert("Failed to save content: " + error.message);
//     }
//   };

//   const handleClearContent = () => {
//     setTitle("");
//     setImageFile(null);
//     fileInputRef.current.value = '';
//     editorRef.current.value = ""; // Clear the editor
//   };

//   const config = {
//     uploader: {
//       insertImageAsBase64URI: true,
//       url: "https://design-union-backend.vercel.app/api/upload", // Your image upload API endpoint
//       format: "json",
//       method: "POST",
//       process: (resp) => {
//         return {
//           files: [resp.url], // Assuming your API returns an object with a 'url' field
//         };
//       },
//     },
//     buttons: [
//       "bold",
//       "italic",
//       "underline",
//       "link",
//       "ul",
//       "ol",
//       "image",
//       "align",
//       "undo",
//       "redo",
//       "hr",
//     ],
//     minHeight: 400,
//   };

//   return (
//     <div className="joditComponent-container">
//       <h2>Create News Article</h2>
//       <label htmlFor="title">Title</label>
//       <input
//         id="title"
//         type="text"
//         placeholder="Enter news title"
//         value={title}
//         onChange={handleTitleChange}
//         className="form-control mb-3 "
//       />
//       <label htmlFor="image">Upload Image</label>
//       <input
//         id="image"
//         type="file"
//         ref={fileInputRef}
//         onChange={handleImageChange}
//         className="form-control mb-3"
//       />
//       <JoditEditor
//         ref={editorRef}
//         config={config}
//       />
//       <div className="mt-3">
//         <button onClick={handleSubmit} className="btn btn-primary">
//           {loading ? "Saving..." : "Save News Article"}
//         </button>
//         <button onClick={handleClearContent} className="btn btn-secondary ms-2">
//           Clear Content
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JoditEditorComponent;
