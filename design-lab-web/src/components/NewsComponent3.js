import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import StackCardsSlider4 from "./StackCardsSlider4";
import { LastNewsContext } from "../context/LastNewsContext";
import { useTranslation } from "react-i18next";
import SpaceComponent from "./SpaceComponent";
import useScreenWidth from "../hooks/useScreenWidth";
import he from "he";

// import { useGetLast5NewsQuery } from "../data/newsSlice2";

const NewsComponent3 = () => {
  const { last5News } = useContext(LastNewsContext);
  const { t, i18n } = useTranslation();
  const screenWidth = useScreenWidth();

  const extractTextRegex = (html) => {
    const textOnly = html.replace(/<[^>]*>/g, " ");
    // Decode HTML entities
    return he.decode(textOnly);
  };

  // console.log(last5News)

  return (
    <Container fluid className="news-component pb-5 mb-0 px-0">
      <SpaceComponent info={{ h1: t("news") }} />

      <Row className="newsComponent-inner-container px-0 pt-3 pt-md-5 justify-content-between">
        <Col
          xs={12}
          sm={3}
          lg={4}
          className="newsComponent-left-col pe-0 ps-0 mb-3 mb-sm-0"
        >
          <div className="newsComponent-carouse-text-container h-sm-100 overflow-hidden mt-1 mb-2 pb-md-2 mb-sm-0">
            {last5News &&
              last5News.map((el, i) => (
                <div
                  key={i}
                  className={`p-2 newsComponent-carouse-text bg-white ${
                    el.activeNews === 0
                      ? "newsComponent-carouse-active-text"
                      : ""
                  }`}
                >
                  <h4
                    className="mb-0 mb-sm-2 fw-bold"
                    lang={i18n.language === "en" ? "en" : "ka"}
                  >
                    {el.title[i18n.language]}
                  </h4>

                  {screenWidth > 768 && (
                    <p
                      className="article-body newsComponent-article-body pt-lg-2 mb-0"
                      lang={i18n.language === "en" ? "en" : "ka"}
                    >
                      {extractTextRegex(el.text[i18n.language])}
                    </p>
                    // <div
                    //   lang={i18n.language === "en" ? "en" : "ka"}
                    //   className="article-body newsComponent-article-body pt-lg-2"
                    //   dangerouslySetInnerHTML={{
                    //     __html: el.text[i18n.language],
                    //   }}

                    // />
                  )}
                </div>
              ))}
          </div>

          <div className="newsComponent-see-more-button-col mt-0 overflow-hidden d-none d-sm-flex align-self-end me-auto py-0 mt-md-3">
            <button className="see-more h-100">
              <Link className="see-more-link px-2 py-2 py-sm-3 mb-1 mb-sm-2" to="/news">
                <span>{t("more")}</span>
                <em></em>
              </Link>
            </button>
          </div>
        </Col>
        <Col
          xs={12}
          sm={8}
          lg={7}
          className="newsComponent-carousel-container px-0 mb-0"
        >
          {/* <StackCardsSlider3 newsData={newsData} /> */}
          <StackCardsSlider4 newsData={last5News} />
        </Col>
      <Row className="w-100 px-0 pt-3 news-componenet-xs-button-container d-flex justify-content-end d-sm-none">
        <div className="newsComponent-see-more-button-col mt-0 overflow-hidden d-flex d-sm-none  align-self-end py-0 pe-0">
          <button className="see-more h-100">
            <Link className="see-more-link px-2 px-md-3 py-2" to="/news">
              <span className="pt-1">{t("more")}</span>
              <em></em>
            </Link>
          </button>
        </div>
      </Row>
      </Row>
    </Container>
  );
};

export default NewsComponent3;
