import * as Yup from "yup";

interface InitialStateFormLogin {
  email: string;
  password: string;
}

export const initialStateFormLogin: InitialStateFormLogin = {
  email: "",
  password: "",
};

export const validatorSchemaFormLogin = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "* El campo del correo electrónico no tiene un formato válido.",
    )
    .required("* El campo del correo electrónico es obligatorio."),
  password: Yup.string()
    .required("* El campo de contraseña es obligatorio.")
    .min(6, "* La contraseña debe tener al menos 6 caracteres."),
});
