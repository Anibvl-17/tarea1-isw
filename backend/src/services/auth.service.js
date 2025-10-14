import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "./user.service.js";

export async function loginUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Credenciales incorrectas");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    throw new Error("Credenciales incorrectas");
  }

  // --- IMPORTANTE! ---
  // Para la tarea 5 se solicita mostrar la contraseña en frontend
  // Pero NO es buena práctica!
  const payload = { sub: user.id, email: user.email, password: password };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  delete user.password;
  return { user, token };
}
