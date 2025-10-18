import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { deleteProfile, getProfile, updateProfile } from "../services/profile.service.js";
import { deleteDataAlert, showConfirmAlert, showErrorAlert, showSuccessAlert } from "../helpers/sweetAlert.js";

const Home = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const setFormData = (data) => {
    const form = document.forms.edit;
    form.email.value = data.email;
    form.password.value = data.password;
  };

  const handleGetProfile = async () => {
    try {
      const result = await getProfile();
      setLoading(true);

      if (result.success) {
        setProfileData(result.data);
      } else {
        showErrorAlert("Error al obtener perfil", "");
        console.error("Error al obtener perfil:", error);
        setProfileData([]);
      }
    } catch (error) {
      showErrorAlert("Error al obtener perfil", "");
      console.error("Error al obtener perfil:", error);
      setProfileData([]);
    } finally {
      setLoading(false);
      setEditProfile(false);
    }
  };

  const handleEditProfile = async () => {
    setProfileData(null);
    setEditProfile(true);

    try {
      const result = await getProfile();

      if (result.success) {
        setFormData(result.data.userData);
      }
    } catch (error) {
      showErrorAlert("Error", "Ocurrió un error al actualizar perfil.")
      console.error("Error al actualizar perfil:", error);
      
    }
  };

  const handleCancelEditProfile = async () => {
    setFormData({
      email: "",
      password: "",
    });
    setEditProfile(false);
  };

  const handleConfirmEditProfile = async (e) => {
    e.preventDefault();
    showConfirmAlert("¿Estás seguro?", "Al editar el perfil, debes iniciar sesión nuevamente.", "Editar perfil y cerrar sesión", handleUpdateProfile);
  }

  const handleUpdateProfile = async () => {    
    try {
      const formData = {
        email: document.forms.edit.email.value,
        password: document.forms.edit.email.password,
      };

      const result = await updateProfile(formData);

      if (result.success) {
        showSuccessAlert(
          "Perfil actualizado",
          "¡Tu perfil se actualizó exitosamente!"
        );
        navigate("/logout")
      }
    } catch (error) {
      showErrorAlert("Error", "Ocurrió un error al actualizar perfil");
      console.error("Error al actualizar perfil:", error);
    } finally {
      setEditProfile(false);
    }
  };

  const handleConfirmDeleteProfile = async (e) => {
    e.preventDefault();
    deleteDataAlert(handleDeleteProfile);
  }

  const handleDeleteProfile = async () => {
    try {
      const result = await deleteProfile();

      if (result.success) {
        showSuccessAlert("Perfil eliminado", "El perfil se eliminó exitosamente.");
        navigate("/logout");
      }
    } catch (error) {
      showErrorAlert("Error", "Ocurrió un error al eliminar perfil.");
      console.error("Error al eliminar perfil:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-2xl transform transition-all hover:scale-105 flex gap-4 flex-col">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 pb-4">
          Página de Inicio
        </h1>

        <div className="flex flex-row gap-4 flex-wrap">
          <button
            onClick={handleGetProfile}
            className="flex-1 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            {loading ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="spinner"
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                ></div>
                Cargando perfil...
              </span>
            ) : (
              "Obtener Perfil"
            )}
          </button>
          <button
            onClick={handleEditProfile}
            className="flex-1 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Editar perfil
          </button>
          <button
            onClick={handleConfirmDeleteProfile}
            className="flex-1 w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            Eliminar perfil
          </button>
        </div>

        {profileData && (
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <p className="mb-6 text-lg font-semibold text-gray-700">
              ¡Hola! Este es tu perfil privado, solo tú puedes verlo.
            </p>
            <div className="overflow-hidden rounded-lg">
              <table className="w-full bg-white">
                <thead className="bg-gray-300 text-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Contraseña
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr className="bg-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {profileData.userData.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {profileData.userData.password}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {editProfile && (
          <div className="rounded-xl p-6 bg-gray-50 border border-gray-200 flex flex-col gap-4">
            <p className="text-lg font-semibold text-gray-700">
              Ingresa los nuevos datos.
            </p>
            <form className="flex flex-col gap-4" name="edit">
              <div className="w-full flex flex-row gap-4 flex-wrap">
                <div className="flex flex-col flex-1 gap-1">
                  <label
                    htmlFor="email"
                    className="text-sm text-gray-600 uppercase tracking-wider"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="border border-gray-200 rounded-lg p-2 text-sm outline-none transition-all hover:border-purple-300 focus:border-purple-400 focus:shadow-md"
                  />
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <label
                    htmlFor="password"
                    className="text-sm  text-gray-600 uppercase tracking-wider"
                  >
                    Contraseña
                  </label>
                  <input
                    type="text"
                    id="password"
                    className="border border-gray-200 rounded-lg p-2 text-sm outline-none transition-all hover:border-purple-300 focus:border-purple-400 focus:shadow-md"
                  />
                </div>
              </div>

              <div className="flex flex-row gap-4 self-end flex-wrap">
                <input
                  type="submit"
                  value="Guardar cambios"
                  onClick={handleConfirmEditProfile}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-300 transform hover:shadow-md hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
                />
                <input
                  type="button"
                  value="Cancelar"
                  onClick={handleCancelEditProfile}
                  className="px-4 py-2 text-sm border bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 transform hover:shadow-md hover:scale-105"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
