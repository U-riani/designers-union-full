// import React, { useEffect, useState } from "react";

// const StackCardsSlider2 = ({newsData}) => {
//   const [arrIndexes, setArrIndexes] = useState([]);

//   useEffect(() => {
//     const sliderImagesBox = document.querySelector(".cards-box");
//     const imageNodes = Array.from(
//       sliderImagesBox.querySelectorAll(".card:not(.hide)")
//     );

//     // Initialize indexes
//     let indexes = imageNodes.map((_, index) => index);
//     setArrIndexes(indexes);

//     const setIndex = (arr) => {
//       arr.forEach((index, i) => {
//         const slide = arr[i]; // Determine slide index
//         const transformValue = getTransformValue(slide); // Calculate transform dynamically
//         const zIndex = imageNodes.length - slide; // Decreasing z-index with each slide
//         const opacity = 1 - slide * 0.1; // Reduce opacity for each slide

//         imageNodes[i].style.transform = transformValue;
//         imageNodes[i].style.zIndex = zIndex;
//         imageNodes[i].style.opacity = opacity;
//         imageNodes[i].dataset.slide = slide; // Set data-slide attribute
//       });
//     };

//     const getTransformValue = (slide) => {
//       const translate = 15 * slide; // Adjust translation step
//       const scale = 1 - slide * 0.025; // Adjust scale step
//       return `translate(${translate}px, -${translate}px) scale(${scale})`;
//     };

//     sliderImagesBox.addEventListener("click", () => {
//       indexes.unshift(indexes.pop()); // Rotate indexes
//       setArrIndexes([...indexes]); // Update state
//       setIndex(indexes);
//     });

//     setIndex(indexes); // Set initial indexes
//   }, []);

//   return (
//     <div className="cards-box">
//       <div className="card hide">
//         <div className="content-placeholder">
//           <div className="row">
//             <div className="img"></div>
//             <div className="img-text"></div>
//           </div>
//           <div className="text text--l"></div>
//           <div className="text text--m"></div>
//           <div className="text text--s"></div>
//           <div className="btn"></div>
//         </div>
//       </div>

//       {newsData && newsData.map((el, index) => (
//         <div key={index} className="card">
//           <div className="content-placeholder">
//             <img className="newsComponent-image" src={el.imgSrc} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StackCardsSlider2;
