import type { FormProps } from "system_design/Form";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "motion/react";
import { lazyRemote } from "src/shared";
import type { ButtonProps, InputProps } from "@bengali/shared-types";
import styles from "./loginpage.module.css";
import {
  initialStateFormLogin,
  validatorSchemaFormLogin,
} from "src/validators";
import { useLogin } from "../../hooks";
// import { toast } from "sonner";
import type { TitleChildrenProps } from "system_design/Title";
import { useToastStore } from "src/core";

const Form = lazyRemote<FormProps>(() => import("system_design/Form"));
const Input = lazyRemote<InputProps<string>>(
  () => import("system_design/Input"),
);
const Button = lazyRemote<ButtonProps>(() => import("system_design/Button"));
const Title = lazyRemote<TitleChildrenProps>(
  () => import("system_design/Title"),
);

export const LoginPage = () => {
  const { mutateAsync: mutateAsyncLogin, isPending: isPendingLogin } =
    useLogin();
  const toast = useToastStore();
  const formik = useFormik({
    initialValues: initialStateFormLogin,
    validationSchema: validatorSchemaFormLogin,
    validateOnMount: true,
    onSubmit: async (values) => {
      if (formik.isValid) {
        const data = await mutateAsyncLogin(values);
        if (!data) {
          toast.error("Las credenciales ingresadas son incorrectas");
          return;
        }
        toast.success("Usuario logueado correctamente");
      }
    },
  });
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={styles.container}
      >
        <div className={styles.wrapper}>
          <Form onSubmit={() => formik.handleSubmit()}>
            <Title>Login</Title>
            <Input
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="correo@ejemplo.com"
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email ? formik.errors.email : ""}
              required
            />
            <Input
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password ? formik.errors.password : ""}
              placeholder="Ingresa tu contraseña"
              required
            />
            <Button label="Login" type="submit" disabled={isPendingLogin} />
          </Form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
