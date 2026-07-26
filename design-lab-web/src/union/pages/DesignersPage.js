import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBehance,
  faInstagram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { faXmark, faGlobe } from "@fortawesome/free-solid-svg-icons";
import SpaceComponent from "../../components/SpaceComponent";
import { useTranslation } from "react-i18next";
import { useGetSomeDesignersQuery } from "../../data/designersSlice2";
import { useLocalStorage } from "../../context/LocalStorageContext";
import Paginations from "../../components/Paginations";
import { getVersionedImage } from "../../utils/imageUtils";
import { useSearchParams } from "react-router-dom";

const DesignersPage = () => {
  const SpaceComonentRef = useRef(null);

  const { localStorageData, updateLocalStorageData } = useLocalStorage();
  const { t, i18n } = useTranslation();

  const itemsPerPage = 12;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [totalItems, setTotalItems] = useState(100);
  const [openImage, setOpenImage] = useState(null);
  const [visibleDesigners, setVisibleDesigners] = useState([]);

  const { data: allDesigners } = useGetSomeDesignersQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  // Only compare and cache on page 1
  // useEffect(() => {
  //   if (allDesigners?.data) {
  //     setTotalItems(allDesigners.totalCount);

  //     if (currentPage === 1) {
  //       const cached = localStorageData.allDesigners;
  //       const isDifferent =
  //         !cached ||
  //         JSON.stringify(cached.data) !== JSON.stringify(allDesigners.data);

  //       if (isDifferent) {
  //         updateLocalStorageData("allDesigners", allDesigners);
  //       }

  //       setVisibleDesigners(cached?.data || allDesigners.data);
  //     } else {
  //       setVisibleDesigners(allDesigners.data);
  //     }
  //   }
  // }, [allDesigners, currentPage]);
  useEffect(() => {
    if (!allDesigners?.data) return;

    setTotalItems(allDesigners.totalCount);

    if (currentPage === 1) {
          console.log('111')

      const cached = localStorageData.allDesigners;
      const isDifferent =
        !cached ||
        JSON.stringify(cached.data) !== JSON.stringify(allDesigners.data);

      if (isDifferent) {
            console.log('222')

        updateLocalStorageData("allDesigners", allDesigners);
      }

      // ✅ Always prefer fresh server data if available
      setVisibleDesigners(allDesigners.data);
    } else {
          console.log('33')

      setVisibleDesigners(allDesigners.data);
    }

  }, [allDesigners, currentPage, updateLocalStorageData, localStorageData]);

  useEffect(() => {
    if (SpaceComonentRef.current) {
      const y =
        SpaceComonentRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        74;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [currentPage]);

  const handleOpenImage = (e) => {
    setOpenImage(e.target.src);
    document.querySelector(".designers-page-row")?.classList.add("blur");
    document.querySelector(".space-component")?.classList.add("blur");
  };

  const handleCloseImage = () => {
    setOpenImage(null);
    document.querySelector(".designers-page-row")?.classList.remove("blur");
    document.querySelector(".space-component")?.classList.remove("blur");
  };

  const getSafeImage = (imagesArray, updatedAt) => {
    const image = imagesArray?.[0];
    return getVersionedImage(image, updatedAt) || "/notAvaliableImage.jpg";
  };

  return (
    <Container fluid className="designersPage px-0">
      <SpaceComponent
        ref={SpaceComonentRef}
        info={{ h1: t("designers") }}
        className="w-100"
      />

      {openImage && (
        <Row className="open-image-container">
          <Col sm={12} className="col">
            <div className="open-image-container-inner">
              <FontAwesomeIcon icon={faXmark} onClick={handleCloseImage} />
              <img src={openImage} alt="" />
            </div>
          </Col>
        </Row>
      )}

      <Row className="designers-page-row py-3 py-lg-5">
        {visibleDesigners?.map((item, i) => (
          <Col
            key={i}
            xs={6}
            sm={5}
            md={4}
            lg={3}
            xl={3}
            className="designersPage-card-col py-3 d-flex justify-content-center align-items-start"
          >
            <Card className="designersPage-card">
              <div className="designersPage-cards-images-top">
                <div className="designersPage-background-image-container">
                  <Card.Img
                    src={getSafeImage(item.projectPhoto, item.updatedAt)}
                    onClick={handleOpenImage}
                  />
                </div>
                <div className="designersPage-designer-image-container">
                  <Card.Img
                    className="object-fit-cover"
                    src={getSafeImage(item.profilePhoto, item.updatedAt)}
                    onClick={handleOpenImage}
                  />
                </div>
              </div>
              <Card.Body className="designersPage-card-body text-white">
                <Card.Text className="text-center d-flex flex-column">
                  <span className="mb-0">
                    {item.name[i18n.language]?.split(" ")[0] ||
                      item.name["ge"]?.split(" ")[0]}
                  </span>
                  <span>
                    {item.name[i18n.language]?.split(" ")[1] ||
                      item.name["ge"]?.split(" ")[1]}
                  </span>
                </Card.Text>
                <ButtonGroup
                  aria-label="designersPage-button-group"
                  className="designersPage-button-group pb-2"
                >
                  <Button
                    href={
                      item.behance?.startsWith("http")
                        ? item.behance
                        : `https://${item.behance}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link"
                    variant="secondary"
                  >
                    <div>
                      {item.companyPerson === "person" ? (
                        <FontAwesomeIcon icon={faBehance} />
                      ) : (
                        <FontAwesomeIcon icon={faGlobe} />
                      )}
                    </div>
                  </Button>
                  <Button
                    href={item.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link"
                    variant="secondary"
                  >
                    <div>
                      <FontAwesomeIcon icon={faFacebookF} />
                    </div>
                  </Button>
                  <Button
                    href={item.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link"
                    variant="secondary"
                  >
                    <div>
                      <FontAwesomeIcon icon={faInstagram} />
                    </div>
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <Row className="mb-0">
          <Paginations
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setSearchParams({ page })}
          />
        </Row>
      </Row>
    </Container>
  );
};

export default DesignersPage;
