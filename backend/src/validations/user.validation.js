import Joi from "joi";

export const userAuthBodyValidation = Joi.object({
  email: Joi.string()
    .required()
    .min(5)
    .max(254)
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/)
    .messages({
      "any.required": "El email es requerido.",
      "string.pattern.base": "Formato de email incorrecto.",
      "string.empty": "El email no puede estar vacio.",
      "string.min": "El email debe tener al menos 5 caracteres.",
      "string.max": "El email no puede exceder los 254 caracteres.",
    }),
  password: Joi.string()
    .required()
    .min(8)
    .max(64)
    .pattern(
      /^(?=.*\d)(?=.*[.!@#$%&*_-])(?=.*[a-zñáéíóú])(?=.*[A-ZÑÁÉÍÓÚ]).{8,}$/
    )
    .messages({
      "any.required": "La contraseña es requerida.",
      "string.pattern.base":
        "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial.",
      "string.empty": "La contraseña no puede estar vacia.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña no puede exceder los 64 caracteres.",
    }),
}).options({
  allowUnknown: false,
  stripUnknown: true,
  abortEarly: false,
});

export const userUpdateBodyValidation = Joi.object({
  email: Joi.string()
    .min(5)
    .max(254)
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/)
    .messages({
      "string.pattern.base": "Formato de email incorrecto.",
      "string.empty": "El email no puede estar vacio.",
      "string.min": "El email debe tener al menos 5 caracteres.",
      "string.max": "El email no puede exceder los 254 caracteres.",
    }),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(
      /^(?=.*\d)(?=.*[.!@#$%&*_-])(?=.*[a-zñáéíóú])(?=.*[A-ZÑÁÉÍÓÚ]).{8,}$/
    )
    .messages({
      "string.pattern.base":
        "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial.",
      "string.empty": "La contraseña no puede estar vacia.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña no puede exceder los 64 caracteres.",
    }),
}).options({
  allowUnknown: false,
  stripUnknown: true,
  abortEarly: false,
});
