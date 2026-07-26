// import React, { useState, useRef } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const QuillEditorComponent = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);
//   const quillRef = useRef(null);

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleChange = (value) => {
//     setContent(value);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('text', content);
//       if (image) {
//         formData.append('image', image);
//       }

//       const response = await fetch('https://design-union-backend.vercel.app/api/news', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) throw new Error('Failed to save content');
//       alert('News saved successfully!');
//       setTitle('');
//       setContent('');
//       setImage(null);
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to save content');
//     }
//   };

//   return (
//     <div>
//       <h2>Create News Article</h2>
//       <input 
//         type="text" 
//         placeholder="Enter news title" 
//         value={title} 
//         onChange={handleTitleChange} 
//         className="form-control mb-3"
//       />
//       <input 
//         type="file" 
//         accept="image/*" 
//         onChange={handleImageChange} 
//         className="form-control mb-3"
//       />
//       <ReactQuill
//         ref={quillRef} 
//         value={content}
//         onChange={handleChange}
//         theme="snow"
//       />
//       <button onClick={handleSubmit} className="btn btn-primary mt-3">
//         Save News Article
//       </button>
//     </div>
//   );
// };

// export default QuillEditorComponent;