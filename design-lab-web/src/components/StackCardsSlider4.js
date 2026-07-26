import React, { useEffect, useState, useRef, useContext } from "react";

import useScreenWidth from "../hooks/useScreenWidth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { LastNewsContext } from "../context/LastNewsContext";

const StackCardsSlider4 = ({ newsData }) => {
  const { last5News, moveSlideToNext, moveSlideToPrev } =
    useContext(LastNewsContext);

  // const news = useSelector(state => state.news)
  // const reversedNewsData = [...newsData].reverse();
  const [distance, setDistance] = useState(30);
  const screenWidth = useScreenWidth();
  const touchStartX = useRef(0); // Store the initial X coordinate of touch
  const touchEndX = useRef(0);
  // console.log(last5News)

  // const moveSlideToNext = () => {
  //   // dispatch(setPosition(-1));
  // };

  // const moveSlideToPrev = () => {
  //   // dispatch(setPosition(1));
  // };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX; // Capture the initial touch X position
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX; // Capture the final touch X position
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    const swipeThreshold = 50; // Minimum distance to consider it a swipe
    const swipeDistance = touchEndX.current - touchStartX.current;

    if (swipeDistance > swipeThreshold) {
      // Swipe right detected
      moveSlideToPrev();
    } else if (swipeDistance < -swipeThreshold) {
      // Swipe left detected
      moveSlideToNext();
    }
  };

  useEffect(() => {
    if (screenWidth <= 768) {
      setDistance(30);
    } else if (screenWidth > 768 && screenWidth <= 1024) {
      setDistance(40);
    } else {
      setDistance(50);
    }

    document.documentElement.style.setProperty(
      "--cardsDistance",
      `${distance}px`
    );

    // console.log(distance);
  }, [screenWidth, distance]);

  useEffect(() => {
    const topElement = document.querySelector(".stack-cards-carousel-top");
    if (topElement) {
      topElement.style.zIndex = last5News.length + 5;
      // console.log("ll");
    }
  }, [last5News.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      moveSlideToNext();
      // console.log("++");
    }, 5000);

    return () => clearTimeout(timer);
  }, [last5News, moveSlideToNext]);

  useEffect(() => {
    const updateSlidesPosition = () => {
      const slidesArr = document.querySelectorAll(".stack-cards-carousel-item");
      slidesArr.forEach((el, i, arr) => {
        const translateValue = distance * last5News[i].activeNews;
        el.style.transform = `translate(${translateValue}px, -${translateValue}px)`;
        el.style.zIndex = `${arr.length - last5News[i].activeNews}`;
      });
    };

    updateSlidesPosition();
    // console.log('--')
  }, [last5News, distance]);

  return (
    <div className="stack-cards-carousel mb-0">
      <div
        className="stack-cards-carousel-inner-container ms-auto mb-0"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="stack-cards-carousel-top"></div>
        <div className="stack-cards-carousel-left"></div>
        {last5News &&
          last5News.map((el, i) => (
            <div
              key={i}
              className={`stack-cards-carousel-item stack-cards-carousel-item-${
                i + 1
              }`}
            >
              <img
                className={`stack-cards-carousel-item-img stack-cards-carousel-item-img-${
                  i + 1
                }`}
                src={el.imageSrc[0]}
                alt=""
              />
            </div>
          ))}
        <div className="arrow-Container">
          <div className="arrow-left" onClick={moveSlideToPrev}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="arrow-right" onClick={moveSlideToNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackCardsSlider4;
