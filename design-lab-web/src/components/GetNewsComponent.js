// // src/components/GetNewsComponent.js
// import React from 'react';
// // import { useGetAllNewsQuery } from '../features/api/apiSlice';
// import { Spinner, Alert, Container } from 'react-bootstrap';
// import { useGetAllNewsQuery } from '../data/newsSlice2';

// const GetNewsComponent = () => {
//   const { data: allNews, error, isLoading } = useGetAllNewsQuery();
//   console.log('GetNewsComponent',allNews)
//   if (isLoading) {
//     return (
//       <Container className="getNewsComponent text-center">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="getNewsComponent">
//         <Alert variant="danger">Error fetching news: {error.message}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="getNewsComponent">
//       {/* {allNews?.length === 0 ? (
//         <p>No news articles available.</p>
//       ) : (
//         allNews.map((item, index) => (
//           <div key={index} className="news-article mb-4">
//             <h3>{item.title}</h3>
//             {item.image && <img src={item.image} alt={item.title} className="img-fluid" />}
//             <div className="article-body" dangerouslySetInnerHTML={{ __html: item.text }} />
//           </div>
//         ))
//       )} */}
//     </Container>
//   );
// };

// export default GetNewsComponent;
