// import React, { useRef, useState } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// /* styles.css */
// // @import '~@ckeditor/ckeditor5-build-classic/build/ckeditor.css';


// class MyCustomUploadAdapter {
//   constructor(loader) {
//     this.loader = loader;
//   }

//   upload() {
//     return this.loader.file.then(
//       (file) =>
//         new Promise((resolve, reject) => {
//           const data = new FormData();
//           data.append('image', file);

//           fetch('https://design-union-backend.vercel.app/api/upload', {
//             method: 'POST',
//             body: data,
//           })
//             .then((response) => {
//               if (response.ok) {
//                 return response.json();
//               }
//               throw new Error('Upload failed');
//             })
//             .then((data) => {
//               resolve({ default: data.url });
//             })
//             .catch((error) => {
//               reject(error);
//             });
//         })
//     );
//   }

//   abort() {
//     // Optionally handle aborting the upload
//   }
// }

// function CustomUploadAdapterPlugin(editor) {
//   editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//     return new MyCustomUploadAdapter(loader);
//   };
// }

// const CKEditorComponent = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [loading, setLoading] = useState(false);
//   const editorRef = useRef();

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('text', content);

//       const response = await fetch('http://localhost:5000/api/news', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) throw new Error('Failed to save content');
//       alert('News saved successfully!');
//       setTitle('');
//       setContent('');
//       editorRef.current.setData('');
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to save content: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearContent = () => {
//     setTitle('');
//     setContent('');
//   };

//   const editorConfiguration = {
//     extraPlugins: [CustomUploadAdapterPlugin],
//     toolbar: [
//       'heading',
//       '|',
//       'bold',
//       'italic',
//       'link',
//       'bulletedList',
//       'numberedList',
//       'blockQuote',
//       '|',
//       'insertTable',
//       'tableColumn',
//       'tableRow',
//       'mergeTableCells',
//       '|',
//       'undo',
//       'redo',
//       'imageUpload',
//     //   'resizeImage',
//     //   'imageTextAlternative',
//     ],
//     // image: {
//     //   resizeOptions: [
//     //     { name: 'resizeImage:original', value: null, label: 'Original' },
//     //     { name: 'resizeImage:50', value: '50', label: '50%' },
//     //     { name: 'resizeImage:75', value: '75', label: '75%' },
//     //     { name: 'resizeImage:100', value: '100', label: '100%' },
//     //   ],
//     //   toolbar: ['resizeImage', 'imageTextAlternative'],
//     // },
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
//        <CKEditor
//         editor={ClassicEditor}
//         config={editorConfiguration}
//         data={content}
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           setContent(data);
//           editorRef.current = editor; // Save editor instance to the ref
//         }}
//       />
//       <div className="mt-3">
//         <button onClick={handleSubmit} className="btn btn-primary">
//           {loading ? 'Saving...' : 'Save News Article'}
//         </button>
//         <button onClick={handleClearContent} className="btn btn-secondary ms-2">
//           Clear Content
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CKEditorComponent;
