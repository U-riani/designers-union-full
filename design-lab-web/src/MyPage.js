// import React, { useState, useEffect } from "react";
// import {jwtDecode} from "jwt-decode";
// import { useNavigate } from 'react-router-dom';

// const MyPage = () => {
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate(); // To redirect user

//   const fetchToken = async () => {
//     try {
//       const username = "admn";
//       const password = "yourpassword";

//       const response = await fetch('http://localhost:4000/admin/login', {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ username, password })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Store token in localStorage and update state
//         localStorage.setItem('token', data.token);
//         setToken(data.token);
//       } else {
//         console.error('Login failed:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching token:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const isTokenExpired = (token) => {
//     if (!token) return true;

//     try {
//       const decoded = jwtDecode(token);
//       console.log(token)
//       console.log(decoded)
//       if(decoded.exp < Date.now() / 1000) {
//         console.log('exp')
//       }
//     } catch (e) {
//       return true;
//     }
//   };

//   useEffect(() => {
//     // Fetch the token initially
//     fetchToken();
//   }, []);

//   useEffect(() => {
//     if (!isLoading && isTokenExpired(token)) {
//       // Token is expired, clear token and redirect to desired page
//       localStorage.removeItem('token');
//       setToken('');
//       console.log('expired')
//       // navigate('/login'); // Change to the page you want to navigate to
//     }
//   }, [token, isLoading, navigate]); // Dependency on token, isLoading, and navigate

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return <div>MyPage</div>;
// };

// export default MyPage;
