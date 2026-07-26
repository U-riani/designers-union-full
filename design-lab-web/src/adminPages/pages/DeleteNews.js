import React from 'react'

const DeleteNews = () => {
  return (
    <div>DeleteNews</div>
  )
}

// export default DeleteNewsimport React, { useEffect, useState } from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import HeroBannerCarousel from "../../components/HeroBannerCarousel";
// import SpaceComponent from "../../components/SpaceComponent";
// import SingleProjectCarousel from "../../components/SingleProjectCarousel";
// import { useTranslation } from "react-i18next";
// import {
//   useGetSingleProjectsQuery,
//   useGetAllProjectsQuery,
//   useDeleteProjectsMutation,
//   useUpdateProjectsMutation
// } from "../../data/projectsSlice";
// import { useParams } from "react-router-dom";

// const AdminSingleProject = () => {
//   const projectId = useParams().projectId;
//   console.log(projectId);
//   const {
//     data: allProjects,
//     error: allErrors,
//     isLoading: allIsLoading,
//   } = useGetAllProjectsQuery();
//   const [deleteProjects] = useDeleteProjectsMutation(projectId)
//   const [updateProject]= useUpdateProjectsMutation()
//   const {
//     data: singleProject,
//     error,
//     isLoading,
//   } = useGetSingleProjectsQuery(projectId);
//   //   const heroData = [1, 2];
//   const image1 = require("../../images/union/projects-main-images/slide1-b.jpg");
//   const image2 = require("../../images/union/projects-main-images/slide2-b.jpg");
//   const image3 = require("../../images/union/projects-main-images/slide3-b.jpg");
//   const { t, i18n } = useTranslation();
//   console.log(singleProject);
//   const [heroData, setHeroData] = useState([]);

//   const data2 = [1, 2, 3, 4];
//   useEffect(() => {
//     if (singleProject) {
//       singleProject.heroData.map((el, i) => {
//         setHeroData((prev) => {
//           return [...prev, singleProject.heroData[i].image[0]];
//         });
//       });
//     }
//   }, [singleProject]);

//   const handleUpdateProject = (e) => {

//   }

//   const data = [image1, image2, image3];
//   console.log(heroData);
//   return (
//     <Container fluid className="single-project-page px-0 w-100">
//       {singleProject && (
//         <Row className="mx-0 w-100">
//           <Row className="hero-banner px-0 w-100">
//             <HeroBannerCarousel data={heroData} />
//           </Row>
//           <Row className="px-0 w-100">
//             <SpaceComponent info={{ h1: singleProject.name[i18n.language] }} />
//           </Row>
//           <Row className="single-project-page-projects-container d-flex flex-column align-center">
//             <Col sm={12}>
//               <h3>{t("description")}</h3>
//               <p>{singleProject.description[i18n.language]}</p>
//             </Col>
//             <Col sm={12}>
//               <Button onClick={handleUpdateProject}>Update</Button>
//               <Button variant="danger ms-5" onClick={()=> deleteProjects(projectId)}>Delete</Button>
//             </Col>
//             <Col sm={12}>
//               <Col xs={12}>
//           <label htmlFor="add-ge-name">Project Name (Georgian)</label>
//           <input
//             value={name.ge}
//             type="text"
//             id="add-ge-name"
//             onChange={(e) => setName({ ...name, ge: e.target.value })}
//           />
//           <label htmlFor="add-en-name">Project Name (English)</label>
//           <input
//             value={name.en}
//             type="text"
//             id="add-en-name"
//             onChange={(e) => setName({ ...name, en: e.target.value })}
//           />
//         </Col>
//         <Col xs={12} className="my-2">
//           <label htmlFor="add-ge-description">
//             Project Description (Georgian)
//           </label>
//           <textarea
//             value={description.ge}
//             rows={4}
//             id="add-ge-description"
//             onChange={(e) =>
//               setDescription({ ...description, ge: e.target.value })
//             }
//           />
//           <label htmlFor="add-en-description">
//             Project Description (English)
//           </label>
//           <textarea
//             value={description.en}
//             rows={4}
//             id="add-en-description"
//             onChange={(e) =>
//               setDescription({ ...description, en: e.target.value })
//             }
//           />
//         </Col>

//         {heroes.map((hero, index) => (
//           <Col xs={12} key={index} className="mb-4">
//             <label htmlFor={`add-ge-heroText-${index}`}>
//               Hero Text (Georgian)
//             </label>
//             <input
//               type="text"
//               id={`add-ge-heroText-${index}`}
//               value={hero.heroText.ge}
//               onChange={(e) =>
//                 handleHeroTextChange(index, "ge", e.target.value)
//               }
//             />
//             <label htmlFor={`add-en-heroText-${index}`}>
//               Hero Text (English)
//             </label>
//             <input
//               type="text"
//               id={`add-en-heroText-${index}`}
//               value={hero.heroText.en}
//               onChange={(e) =>
//                 handleHeroTextChange(index, "en", e.target.value)
//               }
//             />
//             <label htmlFor={`image-${index}`}>Upload Image</label>
//             <input
//               id={`image-${index}`}
//               type="file"
//               ref={(el) => (fileInputRefs.current[index] = el)}
//               onChange={(e) => handleImageChange(index, e.target.files[0])}
//               className="form-control mb-3"
//             />
//           </Col>
//         ))}

//         <Col xs={12}>
//           <Button variant="outline-secondary" onClick={addMoreHeroes}>
//             Add More Heroes
//           </Button>
//         </Col>

//         <Col xs={12} className="d-flex align-items-center py-2 mt-3">
//           <label className="me-2" htmlFor="mainProject">
//             Main Project
//           </label>
//           <input
//             id="mainProject"
//             type="checkbox"
//             checked={mainProject}
//             onChange={() => setMainProject(!mainProject)}
//           />
//         </Col>

//         <Col xs={3}>
//           <Button className="mt-3" onClick={handleSubmit} disabled={isLoading}>
//             {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
//           </Button>
//         </Col>
//             </Col>
//             {data2 &&
//               data2.map((item, i) => (
//                 <Col sm={12} key={i}>
//                   <div className="item-title-container">
//                     <h2>TITLE</h2>
//                   </div>
//                   <SingleProjectCarousel data={data} />
//                 </Col>
//               ))}
//           </Row>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default AdminSingleProject;
