import { loginUser } from "../services/auth.service.js";
import { createUser } from "../services/user.service.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";
import { userAuthBodyValidation } from "../validations/user.validation.js";

export async function login(req, res) {
  try {
    const { body } = req;
    
    const { error } = userAuthBodyValidation.validate(body);

    if (error) {
      return handleErrorClient(res, 400, "Parámetros invalidos", error.message);
    }
    
    const data = await loginUser(body.email, body.password);
    handleSuccess(res, 200, "Login exitoso", data);
  } catch (error) {
    handleErrorClient(res, 401, error.message);
  }
}

export async function register(req, res) {
  try {
    const { body } = req;
    
    const { error } = userAuthBodyValidation.validate(body);

    if (error) {
      return handleErrorClient(res, 400, "Parámetros invalidos", error.message);
    }
    
    const newUser = await createUser(body);
    delete newUser.password; // Nunca devolver la contraseña
    handleSuccess(res, 201, "Usuario registrado exitosamente", newUser);
  } catch (error) {
    if (error.code === '23505') { // Código de error de PostgreSQL para violación de unique constraint
      handleErrorClient(res, 409, "El email ya está registrado");
    } else {
      handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
  }
}

export async function logout(req, res) {
  // Elimina la cookie de sesión del cliente
  try {
    res.clearCookie("jwt", { httpOnly: true });
    handleSuccess(res, 200, "Sesión cerrada exitosamente.");
  } catch (error) {
    handleErrorServer(res, 500, "Error al cerrar sesión", error);
  }
}