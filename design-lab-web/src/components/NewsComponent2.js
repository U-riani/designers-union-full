// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const NewsComponent2 = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/news');
//         setNews(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       {news.map((article) => (
//         <div key={article._id}>
//           <h2>{article.title}</h2>
//           <img src={article.imgSrc} alt={article.title} />
//           <p>{article.text}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NewsComponent2;
