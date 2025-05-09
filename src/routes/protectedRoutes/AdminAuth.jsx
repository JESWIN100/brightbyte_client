import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminAuth = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      setTimeout(async () => {
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
          setUser(null);
          navigate("/admin/login");
        } finally {
          setLoading(false); // Set loading to false after checking
        }
      }, 1000); // 2-second delay before API call
    };

    checkAdmin();
  }, [navigate]);

  console.log("auth", user);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <img
          src="http://localhost:5173/src/assets/bright_byte-removebg-preview.png"
          alt="Loading..."
          style={{ width: "200px", height: "200px" }}
        />
      </div>
    );
  }

  return user ? children : <div>Admin not authenticated</div>;
};
