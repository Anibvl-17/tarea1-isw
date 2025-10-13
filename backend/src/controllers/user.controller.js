import { updateUser, deleteUser } from "../services/user.service.js";
import {
  handleSuccess,
  handleErrorClient,
} from "../Handlers/responseHandlers.js";
import jwt from "jsonwebtoken";
import { userUpdateBodyValidation } from "../validations/user.validation.js";

export async function updateUserById(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const payload = jwt.decode(token, process.env.JWT_SECRET);
    const userId = payload.sub;

    if (!userId) {
      return handleErrorClient(res, 400, "ID de usuario inválido");
    }

    const { body } = req;

    const { error } = userUpdateBodyValidation.validate(body);
    
    if (error) {
      return handleErrorClient(res, 400, "Parámetros invalidos", error.message);
    }

    const updatedUser = await updateUser(userId, body);

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
