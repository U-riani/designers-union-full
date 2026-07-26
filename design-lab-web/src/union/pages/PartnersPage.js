import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import SpaceComponent from "../../components/SpaceComponent";
import {useGetAllPartnersQuery} from "../../data/partnersSlice"
import { useTranslation } from "react-i18next";


const PartnersPage = () => {
  const {data: partners} = useGetAllPartnersQuery()
  const { t, i18n } = useTranslation();
  // console.log(partners)

  return (
    <Container fluid className="partnersPagemy-0">
      <SpaceComponent info={{h1: t('partners')}}/>
      <Row className="partners-page-row py-3 py-md-5">
        {partners &&
          partners.map((part, i) => (
            <Col
              xs={12}
              sm={6}
              lg={4}
              xxl={3}
              key={i}
              className={`overflow-hidden partnersPage-col partnersPage-col-${i} py-3 px-3`}
            >
              <div
                className={` partnersPage-col-inner-container partnersPage-col-inner-container-${i}`}
              >
                <div className="partnercPage-img-container">
                  <img src={part.image[0]} alt={part.name.ge} />
                </div>
                <div className="partnersPage-text-container">
                  
                  <div className="partnersPage-text-inner-container ">
                    <h3 className="">{part.name[i18n.language]}</h3>
                    <p>{part.text[i18n.language]}</p>
                  </div>
                  <div className="partnersPage-link ps-0">
                    <Button className="rounded-0 bg-dark border-light">
                        <a href={`${part.websiteUrl}`} target="_blank" rel="noopener noreferrer">visit website</a>
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default PartnersPage;
