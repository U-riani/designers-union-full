import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Container, Row } from 'react-bootstrap';
// import AdminNavbar from './components/AdminNavbar';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login'); // Redirect to login if no token is present
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);

      const expiresIn = decoded.exp * 1000 - Date.now(); // Convert seconds to milliseconds
      if (expiresIn > 0) {
        const timer = setTimeout(() => {
          localStorage.removeItem('token');
          navigate('/login');
        }, expiresIn);

        return () => clearTimeout(timer);
      } else {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('token');
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // const handleLogout = () => {
  //   console.log('Logout clicked');
  //   localStorage.removeItem('token'); // Remove the token
  //   navigate('/login'); // Redirect to login page
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name || 'Admin'}!</p>
          {/* <AdminNavbar handleLogout={handleLogout} /> */}
          {/* Add more dashboard content here */}
        </div>
      ) : (
        <p>Invalid token. Please log in again.</p>
      )}
      <Container fluid>
        <Row className='admin-text-edditor-row'>
          {/* <QuillEditorComponent /> */}
          {/* <CKEditorComponent /> */}
          {/* <JoditEditorComponent /> */}
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
