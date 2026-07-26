// class MyCustomUploadAdapter {
//     constructor(loader) {
//       this.loader = loader;
//     }
  
//     upload() {
//       return new Promise((resolve, reject) => {
//         const data = new FormData();
//         data.append('image', this.loader.file);
        
//         fetch('http://localhost:5000/api/upload', {
//           method: 'POST',
//           body: data,
//         })
//         .then(response => {
//           if (response.ok) {
//             return response.json();
//           }
//           throw new Error('Upload failed');
//         })
//         .then(data => {
//           resolve({ default: data.url }); // Assuming the server returns the image URL
//         })
//         .catch(reject);
//       });
//     }
  
//     abort() {
//       // Implement abort logic if needed
//     }
//   }
  