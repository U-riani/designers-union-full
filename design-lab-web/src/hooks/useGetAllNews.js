import { useEffect, useState } from "react";

const useGetAllNews = () => {
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [error, setError] = useState(null); // New error state

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await fetch("https://design-union-server.onrender.com/api/news");
        if (!response.ok) throw new Error("Failed to fetch news");
        
        const json = await response.json();
        setAllNews(json?.reverse());
      } catch (error) {
        console.log(error);
        setError(error.message); // Set error message in state
      } finally {
        setLoading(false); // Set loading to false when fetching is done
      }
    };

    fetchNews();
  }, []);

  return { allNews, loading, error }; // Return loading and error states
};

export default useGetAllNews;
