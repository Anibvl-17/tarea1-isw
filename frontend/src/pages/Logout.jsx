import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout as logoutService } from "@services/auth.service";
import { useAuth } from "@context/AuthContext";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        await logoutService();
        setUser(null);
      } catch (error) {
        showErrorAlert("Error", error?.message || "No se pudo cerrar sesión");
      } finally {
        navigate("/auth");
      }
    })();
  }, []);

  return null;
};

export default Logout;
