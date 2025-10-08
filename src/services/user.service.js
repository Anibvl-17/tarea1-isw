import { AppDataSource } from "../config/configDb.js";
import { User } from "../entities/user.entity.js";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = userRepository.create({
    email: data.email,
    password: hashedPassword,
  });

  return await userRepository.save(newUser);
}

export async function findUserByEmail(email) {
  return await userRepository.findOneBy({ email });
}

export async function updateUser(id, data) {
  const userData = await userRepository.findOneBy({ id });

  if (!userData) {
    return null;
  }

  if (data.email) {
    userData.email = data.email;
  }

  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    userData.password = hashedPassword;
  }

  const updatedUser = await userRepository.save(userData);
  delete updatedUser.password;

  return updatedUser;
}

export async function deleteUser(id) {
  const user = await userRepository.findOneBy({ id });

  if (!user) return false;

  await userRepository.remove(user);
  return true;
}
