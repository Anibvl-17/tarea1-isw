import { updateUser, deleteUser } from "../services/user.service.js";
import {
  handleSuccess,
  handleErrorClient,
} from "../Handlers/responseHandlers.js";
import jwt from "jsonwebtoken";

export async function updateUserById(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const payload = jwt.decode(token, process.env.JWT_SECRET);
    const userId = payload.sub;

    const data = req.body;

    if (!userId) {
      return handleErrorClient(res, 400, "ID de usuario inválido");
    }

    // Mas adelante se debe validar que no se ingresen datos adicionales.
    if (!data.email && !data.password) {
      return handleErrorClient(res, 400, "Email o contraseña son requeridos");
    }

    const updatedUser = await updateUser(userId, data);

    if (updatedUser) {
      handleSuccess(res, 200, "Usuario actualizado exitosamente", updatedUser);
    }
  } catch (error) {
    handleErrorClient(res, 404, error.message);
  }
}

export async function deleteUserById(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const payload = jwt.decode(token, process.env.JWT_SECRET);
    const userId = payload.sub;

    if (!userId) {
      return handleErrorClient(res, 400, "ID de usuario inválido");
    }
    
    const response = await deleteUser(userId);
    if (response) {
      // Elimina la cookie del token JWT
      res.clearCookie("jwt", { httpOnly: true });
      handleSuccess(res, 200, "Usuario eliminado exitosamente", { userId });
    }
    else {
      handleErrorClient(res, 404, "Usuario no encontrado");
    }

  } catch (error) {
    handleErrorClient(res, 404, error.message);
  }
}
