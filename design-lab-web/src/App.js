import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./adminPages/LoginPage";
import AdminDashboard from "./adminPages/AdminDashboard";
import UnionLayout from "./union/components/UnionLayout";
import UnionMainPage from "./union/pages/UnionMainPage";
import NewsPage from "./union/pages/NewsPage";
import DesignersPage from "./union/pages/DesignersPage";
import ProjectsPage from "./union/pages/ProjectsPage";
import PartnersPage from "./union/pages/PartnersPage";
import ContactPage from "./union/pages/ContactPage";
import SingleNewsPage from "./union/pages/SingleNewsPage";
import BlogsPage from "./union/pages/BlogsPage";

import AddNews from "./adminPages/pages/AddNews";
import AdminLayout from "./adminPages/adminlayout/AdminLayout";
import AdminALlNews from "./adminPages/pages/AdminAllNews";
import AdminSingleNews from "./adminPages/pages/AdminSingleNewsPage";
import ProtectedRoute from "./adminPages/protectedRoute/ProtectedRoute"; // Import the ProtectedRoute component
import { AuthProvider } from "./adminPages/context/AuthContext";

import "bpg-le-studio-04-caps/css/bpg-le-studio-04-caps.min.css";
import AddHero from "./adminPages/pages/AddHero";
import AdminAllHeros from "./adminPages/pages/AdminAllHeros";
import AdminAddPartners from "./adminPages/pages/AdminAddPartners";
import AdminAllPartners from "./adminPages/pages/AdminAllPartners";
import AdminAddDesigner from "./adminPages/pages/AdminAddDesigner";
import AdminAllDesigners from "./adminPages/pages/AdminAllDesigners";

import { LocalStorageProvider } from "./context/LocalStorageContext"; // Adjust path as needed
import Registration from "./union/pages/Registration";
import AdminAllProjects from "./adminPages/pages/AdminAllProjects";
import SingleProject from "./union/pages/SingleProject";
import AdminAddProjects from "./adminPages/pages/AdminAddProjects";
import AdminSingleProject from "./adminPages/pages/AdminSingleProject";
import AboutUs from "./union/pages/AboutUs";
import VisitBookPage from "./union/pages/BookVisitPage";
import ScrollToTop from "./hooks/ScrollToTop";
import AdminAddAboutUs from "./adminPages/pages/AdminAddAboutUs";
import AdminEditAboutUs from "./adminPages/pages/AdminEditAboutUs";
import AdminAddAboutUsMainPage from "./adminPages/pages/AdminAddAboutUsMainPage";
import AdminEditAboutUsMainPage from "./adminPages/pages/AdminUpdateAboutUsMainPage";
import AdminAddBlogs from "./adminPages/pages/AdminAddBlogs";
import SingleBlogPage from "./union/pages/SingleBlogPage";
import AdminAllBlogs from "./adminPages/pages/AdminAllBlogs";
import AdminEditBlog from "./adminPages/pages/AdminEditBlog";
// <<<<<<< HEAD
import AdminAddTeamMember from "./adminPages/pages/AdminAddTeamMember";
import AdminEditTeamMember from "./adminPages/pages/AdminEditTeamMember";
import AdminTeamList from "./adminPages/pages/AdminTeamList ";
// =======
import AdminAllDesignersInfo from "./adminPages/pages/AdminAllDesignersInfo";
// >>>>>>> 97b230ca10e7e55557d3a2df3842b8c86634a7d5

const App = () => (
  <AuthProvider>
    <LocalStorageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/" element={<AdminLayout />}>
            <Route
              index
              element={<ProtectedRoute element={<AdminDashboard />} />}
            />
            <Route
              path="add-news"
              element={<ProtectedRoute element={<AddNews />} />}
            />
            <Route
              path="all-news"
              element={<ProtectedRoute element={<AdminALlNews />} />}
            />
            <Route
              path="all-news/:newsId"
              element={<ProtectedRoute element={<AdminSingleNews />} />}
            />
            <Route
              path="add-blog"
              element={<ProtectedRoute element={<AdminAddBlogs />} />}
            />
            <Route
              path="all-blogs"
              element={<ProtectedRoute element={<AdminAllBlogs />} />}
            />
            <Route
              path="all-blogs/:blogId"
              element={<ProtectedRoute element={<AdminEditBlog />} />}
            />
            <Route
              path="add-hero"
              element={<ProtectedRoute element={<AddHero />} />}
            />
            <Route
              path="all-heros"
              element={<ProtectedRoute element={<AdminAllHeros />} />}
            />
            <Route
              path="add-partner"
              element={<ProtectedRoute element={<AdminAddPartners />} />}
            />
            <Route
              path="all-partners"
              element={<ProtectedRoute element={<AdminAllPartners />} />}
            />
            <Route
              path="add-designer"
              element={<ProtectedRoute element={<AdminAddDesigner />} />}
            />
            <Route
              path="all-designers"
              element={<ProtectedRoute element={<AdminAllDesigners />} />}
            />
            <Route
              path="all-designers-info"
              element={<ProtectedRoute element={<AdminAllDesignersInfo />} />}
            />
            <Route
              path="add-projects"
              element={<ProtectedRoute element={<AdminAddProjects />} />}
            />
            <Route
              path="all-projects"
              element={<ProtectedRoute element={<AdminAllProjects />} />}
            />
            <Route
              path="all-projects/:projectId"
              element={<ProtectedRoute element={<AdminSingleProject />} />}
            />
            <Route
              path="add-about-us"
              element={<ProtectedRoute element={<AdminAddAboutUs />} />}
            />
            <Route
              path="edit-about-us"
              element={<ProtectedRoute element={<AdminEditAboutUs />} />}
            />
            <Route
              path="add-about-us-main-page"
              element={<ProtectedRoute element={<AdminAddAboutUsMainPage />} />}
            />
            <Route
              path="team"
              element={<ProtectedRoute element={<AdminTeamList />} />}
            />

            <Route
              path="team/add"
              element={<ProtectedRoute element={<AdminAddTeamMember />} />}
            />

            <Route
              path="team/edit/:id"
              element={<ProtectedRoute element={<AdminEditTeamMember />} />}
            />
            <Route
              path="edit-about-us-main-page"
              element={
                <ProtectedRoute element={<AdminEditAboutUsMainPage />} />
              }
            />
          </Route>
          {/* Add more routes as needed */}
          <Route path="/" element={<UnionLayout />}>
            <Route index element={<UnionMainPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:newsId" element={<SingleNewsPage />} />
            <Route path="designers" element={<DesignersPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="blog" element={<BlogsPage />} />
            <Route path="blog/:blogId" element={<SingleBlogPage />} />
            <Route path="projects/:projectId" element={<SingleProject />} />
            <Route path="partners" element={<PartnersPage />} />
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="registration" element={<Registration />} />
            <Route path="bookVisit" element={<VisitBookPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Router>
    </LocalStorageProvider>
  </AuthProvider>
);

export default App;
