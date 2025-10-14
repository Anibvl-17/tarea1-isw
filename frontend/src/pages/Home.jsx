import { useState } from "react";
import { getProfile } from "../services/profile.service.js";
import { showErrorAlert } from "../helpers/sweetAlert.js";

const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-2xl transform transition-all hover:scale-105">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 pb-4">
          Página de Inicio
        </h1>

        <button
          onClick={handleGetProfile}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
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
              Cargando pilotos...
            </span>
          ) : (
            "Obtener Perfil"
          )}
        </button>

        {profileData && (
          //<div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
          //  <pre className="text-sm text-gray-700 overflow-auto">{JSON.stringify(profileData, null, 2)}</pre>
          //</div>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
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
      </div>
    </div>
  );
};

export default Home;
