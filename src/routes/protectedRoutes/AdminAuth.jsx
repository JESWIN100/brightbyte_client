import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminAuth = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize with null
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/check-admin`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null); // Ensure user is set to null on error
        navigate("/admin/login"); // Move navigation here
      }
    };

    checkAdmin();
  }, [navigate]);

  console.log("auth", user);

  if (user === null) {
    return <div>Checking authentication...</div>;
  }

  return user ? children : <div>Admin not authenticated</div>;
};
