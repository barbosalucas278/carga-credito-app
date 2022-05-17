import * as yup from "yup";
export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido.")
    .required("El Email es requerido."),
  password: yup
    .string()
    .required("La contraseña es requerida.")
    .min(8, "La contraseña es muy corta, minimo 8 caracteres.")
    .max(100, "La contraseña es muy larga, maximo 100 caracteres."),
});
