import axios from './root.service.js';

export async function getProfile() {
    try {
        const response = await axios.get('/profile/private');

        return {
          success: true,
          data: response.data.data,
          message: response.data.message
        };
    } catch (error) {
      console.error("Error al obtener perfil:", error);

      return {
        success: false,
        message: error.response?.data?.message || "Error al obtener perfil.",
        data: []
      }
    }
}
