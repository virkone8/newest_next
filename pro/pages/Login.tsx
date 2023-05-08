import React from "react";
import styles from "@/styles/Home.module.scss";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Input,
  Button,
  Card,
  CardContent,
  Box,
  Typography,
  Link,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

interface IFormInputs {
  email: string;
  password: string;
}

const LoginSchema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  })
  .required();

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: IFormInputs) => {
    // alert(JSON.stringify(data));
    enqueueSnackbar(`Login Successfully`, {
      autoHideDuration: 5000,
      variant: "success",
    });
  };
  return (
    <Box className={styles.body}>
      <Box className={styles.container}>
        <h2>
          <Image src="/Vector.png" alt="icon" width={30} height={30} />
          Compsheets
        </h2>
        <Box className={styles.formWrap}>
          <h1>Log in</h1>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className={styles.formGroup}>
              <label htmlFor="email">Email Address*</label>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={styles.input}
                    placeholder="Enter Email"
                    error={Boolean(errors?.email)}
                  />
                )}
                name="email"
                control={control}
                defaultValue=""
              />
              {errors.email && (
                <p className={styles.err}>{errors.email.message}</p>
              )}
            </Box>

            <Box className={styles.formGroup}>
              <label htmlFor="password">Password*</label>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={styles.input}
                    placeholder="Enter Password"
                    error={Boolean(errors?.password)}
                  />
                )}
                name="password"
                control={control}
                defaultValue=""
              />
              {errors.password && (
                <p className={styles.err}>{errors.password.message}</p>
              )}
            </Box>
            <Box className={styles.action}>
              <button type="submit" className="btn">
                Login
              </button>
              <span>
                or &nbsp;
                <Link className="link" href="/Signup">
                  Sign up
                </Link>
              </span>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
