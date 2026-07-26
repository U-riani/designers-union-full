import React, { useEffect, useState } from "react";
import he from "he";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SpaceComponent from "../../components/SpaceComponent";
import { Link } from "react-router-dom";
import { useGetAllBlogsQuery } from "../../data/blogSlice";
import { useLocalStorage } from "../../context/LocalStorageContext";

const BlogsPage = () => {
  const { data: serverBlogsData, isLoading, error } = useGetAllBlogsQuery();
  const { t, i18n } = useTranslation();
  const { localStorageData, updateLocalStorageData } = useLocalStorage();
  const blogsData = localStorageData.allBlogs;
  const [lineClamps, setLineClamps] = useState([]);

  const isDataDifferent = (localData, serverData) => {
    if (!localData || localData.length !== serverData.length) return true;
    return JSON.stringify(localData) !== JSON.stringify(serverData);
  };

  useEffect(() => {
    if (serverBlogsData && isDataDifferent(blogsData, serverBlogsData)) {
      updateLocalStorageData("allBlogs", serverBlogsData);
    }
  }, [serverBlogsData]);

  const extractTextRegex = (html) => {
    const textOnly = html.replace(/<[^>]*>/g, " ");
    return he.decode(textOnly);
  };

  const geMonths = [
    "იან",
    "თებ",
    "მარ",
    "აპრ",
    "მაი",
    "ივნ",
    "ივლ",
    "აგვ",
    "სექ",
    "ოქტ",
    "ნოე",
    "დეკ",
  ];
  const enMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month =
      i18n.language === "en"
        ? enMonths[date.getMonth()]
        : geMonths[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    if (blogsData?.length) {
      const timeoutId = setTimeout(() => {
        const containers = document.querySelectorAll(".blogs-text-container");
        const titles = document.querySelectorAll(".blogs-card-title");

        const newClamps = Array.from(containers).map((container, i) => {
          const title = titles[i];
          const lineHeight = 15;

          if (container && title) {
            const containerHeight = container.getBoundingClientRect().height;
            const titleHeight = title.getBoundingClientRect().height;
            const availableHeight = containerHeight - titleHeight - 8;

            return Math.floor(availableHeight / lineHeight);
          }

          return 1;
        });

        setLineClamps(newClamps);
      }, 500); // 0.5 second delay

      return () => clearTimeout(timeoutId);
    }
  }, [blogsData, i18n.language]);


  if (!blogsData && isLoading) {
    return (
      <Container className="getNewsComponent text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="getNewsComponent">
        <Alert variant="danger">Error fetching blogs: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="newsPage px-0">
      <SpaceComponent info={{ h1: t("blog") }} className="w-100" />
      <Row className="newsPage-row newsPage-row-2 px-md-4 mt-3 mt-md-4 mt-lg-5">
        {blogsData && blogsData.length < 1 && <h4 className="py-4">{t("BlogComingSoon")}</h4>}
        {blogsData &&
          blogsData.map((el, i) => (
            <Col xs={12} sm={6} lg={4} className={`mb-4 blog-${i + 1}`} key={i}>
              <Link
                to={`${el._id}`}
                className="card blogs-card rounded-0 border-0"
              >
                <div className="card-header m-0 p-0 border-0">
                  <img
                    src={el.images[0]}
                    className="card-img-top rounded-0"
                    alt=""
                  />
                </div>
                <div className="card-body blogs-card-body">
                  <p className="blogs-date">{formatDate(el.date)}</p>
                  <div className="blogs-text-container">
                    <h5
                      className="blogs-card-title card-title"
                      title={el.title[i18n.language]}
                    >
                      {el.title[i18n.language]}
                    </h5>
                    <p
                      className="blogs-card-text card-text"
                      title={extractTextRegex(el.text[i18n.language])}
                      style={{
                        WebkitLineClamp: lineClamps[i] || 3,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {extractTextRegex(el.text[i18n.language])}
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default BlogsPage;
