import React, { createContext, useState, useEffect } from "react";
import { useGetLast5NewsQuery } from "../data/newsSlice2";

export const LastNewsContext = createContext();

export const LastNewsProvider = ({ children }) => {
  const [position, setPosition] = useState(0);
  const [last5News, setLast5News] = useState([]);
  const { data: last5NewsData } = useGetLast5NewsQuery();
  // console.log(last5NewsData)

  useEffect(() => {
    if (last5NewsData) {
      setLast5News(
        last5NewsData.map((el, i) => ({
          id: i,
          title: el.title,
          imageSrc: el.images,
          text: el.text,
          activeNews: i, // Initially set the first slide as active
        }))
      );
    }
    // console.log(position)
  }, [last5NewsData]);

  const moveSlide = (step) => {
    setPosition((prevPosition) => {
     
      setLast5News((prevNews) =>
        prevNews.map((el, i) => ({
          ...el,
          // activeNews:  (el.activeNews + newPosition) % last5News.length,
          activeNews:
            (el.activeNews + 1 * step + last5News.length) % last5News.length,
        }))
      );

      return 'newPosition';
    });
  };

  const moveSlideToNext = () => moveSlide(-1);
  const moveSlideToPrev = () => moveSlide(1);

  return (
    <LastNewsContext.Provider
      value={{ position, moveSlideToNext, moveSlideToPrev, last5News }}
    >
      {children}
    </LastNewsContext.Provider>
  );
};
