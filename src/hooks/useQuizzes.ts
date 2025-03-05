import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the custom hook for fetching quizzes
const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);  // State to store quiz data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null);    // State to manage error handling

  useEffect(() => {
    // Fetch quizzes from the backend
    const fetchQuizzes = async () => {
      try {
        setLoading(true);  // Set loading to true when starting the fetch
        const response = await axios.get('http://localhost:8080/api/v1/quiz');  // Change to your backend API endpoint
        setQuizzes(response.data);  // Store the fetched quizzes in the state
      } catch (err) {
        setError(err.message || 'Error fetching quizzes');  // Handle errors
      } finally {
        setLoading(false);  // Set loading to false after data is fetched or error occurred
      }
    };

    fetchQuizzes();  // Call the function to fetch quizzes
  }, []); // Empty dependency array means this runs only once when the component mounts

  return { quizzes, loading, error };
};

export default useQuizzes;
