import React, { forwardRef } from "react";
import { Container, Row } from "react-bootstrap";

const SpaceComponent = forwardRef(({ info }, ref) => {
  const arrow = document.querySelector(".space-component-arrow-left");
  const parent = document.querySelector(".space-component-inner-container");

  if (arrow && parent) {
    // Set arrow border sizes dynamically based on parent height
    const parentHeight = parent.offsetHeight;
    arrow.style.borderTop = `${parentHeight / 2}px solid transparent`;
    arrow.style.borderBottom = `${parentHeight / 2}px solid transparent`;
  }

  return (
    <Container ref={ref} fluid id="space-component" className="space-component p-0  mb-0">
      <div className="space-componentarrow-right"></div>
      <Row className="space-component-inner-container ms-0  pb-1 mb-0">
        <div className="space-component-arrow-left-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="150%"
            height="200%"
            fill="black"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke="#e3e6e4"
              strokeWidth="3"
              fill="none"
              
            />
          </svg>
        </div>
        {info && (
          <div className="spaceComponent-text-container p-0 mb-0 pe-2 pe-lg-3 my-0 my-lg-3 position-relative">
            <h1 className="position-absolute opacity-0">Designers Union designersunion Designersunion DesignersUnion</h1>
            <strong className="  pb-0 mb-0">{info.h1}</strong>
            <h1 className=" d-inline-flex justify-content-end pt-0 mt-0 mb-0">
              <span className="">{info.h1}</span>
            </h1>
            {/* {info.h3 && <h3>{info.h3}</h3>} */}
          </div>
        )}
      </Row>
    </Container>
  );
});

export default SpaceComponent;
