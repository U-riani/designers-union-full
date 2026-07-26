// import React, { useEffect, useRef, useState } from "react";
// import { setActiveNews } from "../data/newsSlice";
// import { useDispatch } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// const StackCardsSlider = ({ newsData }) => {
//   const dispatch = useDispatch();
//   const cardsContainerRef = useRef(null);
//   const [moveToNext, setMoveToNext] = useState(1);
//   const distance = 5; // Distance between cards
//   const [distanceX, setDistanceX] = useState(37); // Default horizontal distance
//   const [cards, setCards] = useState([]);

//   const removeActiveClass = (item) => item.classList.remove("active-news");
//   const addActiveClass = (item) => {
//     console.log('item')
//     if (item.style.transform === "translate(0px, 0%)") {
//       // item.classList.add("active-news");
//       // dispatch(setActiveNews(item.getAttribute("data")));
//     }else {
//       return
//     }
//   };

//   const activeNewsText = (item) => {
//     if (item.style.transform === "translate(0px, 0%)") {
//       // dispatch(setActiveNews(item.getAttribute("data")));
//     }
//   }

//   const initializeSlider = () => {
//     const cardElements = Array.from(cardsContainerRef.current.querySelectorAll(".slider-card"));
//     setCards(cardElements);

//     const containerWidth = cardsContainerRef.current.getBoundingClientRect().width;
//     const cardWidth = cardElements[0].getBoundingClientRect().width;
//     const x = (containerWidth - cardWidth) / (cardElements.length - 1);
//     setDistanceX(x);

//     cardElements.forEach((el, i) => {
//       const translateY = (cardElements.length - i - 1) * distance;
//       const translateX = (cardElements.length - i - 1) * x;
//       el.style.transform = `translate(${translateX}px, -${translateY}%)`;
//       el.style.zIndex = i + 1;
//       // addActiveClass(el);
//     });
//   };

//   const updateSlides = (direction) => {
//     const updatedIndex = direction === "next"
//       ? moveToNext >= cards.length ? 1 : moveToNext + 1
//       : moveToNext <= 1 ? cards.length : moveToNext - 1;

//     cards.forEach((el, i) => {
//       removeActiveClass(el);
//       activeNewsText(el);
//       const indexOffset = direction === "next" ? moveToNext : moveToNext - 2 + cards.length;
//       const translateX = (cards.length - ((i + indexOffset) % cards.length) - 1) * distanceX;
//       const translateY = (cards.length - ((i + indexOffset) % cards.length) - 1) * distance;

//       el.style.transform = `translate(${translateX}px, -${translateY}%)`;
//       el.style.zIndex = cards.length - translateY / distance;
//       el.style.transition = "transform 0.6s ease-in-out, z-index 0s";

//       // addActiveClass(el);
      
//     });

//     setMoveToNext(updatedIndex);
//   };

//   useEffect(() => {
//     initializeSlider(); // Initialize the slider on mount

//     // Set CSS properties dynamically
//     document.documentElement.style.setProperty("--cardsArrayLength", `${newsData.length}`);
//     document.documentElement.style.setProperty("--cardsDistance", `${distance / 100}`);
//   }, [newsData]);

//   return (
//     <div className="stack-cards-slider">
//       <div className="stack-cards-slider-container mb-0">
//         <div className="cards-container" ref={cardsContainerRef}>
//           {newsData.map((el, i) => (
//             <div key={i} className={`slider-card card-${i + 1}`} data={i}>
//               <img className="newsComponent-image" src={el.imgSrc} alt={`News ${i + 1}`} />
//             </div>
//           ))}
//         </div>
//         <div className="arrows-container mb-0">
//           <div
//             onClick={() => updateSlides("prev")}
//             className="stackCards-arrow stackCards-arrow-prev mb-0"
//           >
//             <FontAwesomeIcon icon={faArrowLeft} size="2x" />
//           </div>
//           <div
//             onClick={() => updateSlides("next")}
//             className="stackCards-arrow stackCards-arrow-next mb-0"
//           >
//             <FontAwesomeIcon icon={faArrowRight} size="2x" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StackCardsSlider;
