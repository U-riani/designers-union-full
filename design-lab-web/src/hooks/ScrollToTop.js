import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useScreenWidth from "./useScreenWidth";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const screenWidth = useScreenWidth()
  // console.log(pathname);

  useEffect(() => {
    if (pathname === "/" || pathname.includes("/projects/")) {
      window.scrollTo({
        top: window.innerHeight * 0,
        behavior: "smooth",
      });
    } else {
      // window.scrollTo({
      //   top: window.innerHeight * 0.67,
      //   behavior: "smooth",
      // });
      const element = document.getElementById("space-component");
      if (element) {
        const elementPosition = element.getBoundingClientRect().top; // Element's position relative to the viewport
        const offsetPosition = window.scrollY + elementPosition - (screenWidth < 992 ? 74 : screenWidth >= 992 && screenWidth < 1100 ? 66 : screenWidth >= 1100 && screenWidth < 1200 ? 71 : 87) ; // Adjust by subtracting navbar height (74px)

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
