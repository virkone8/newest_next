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
  fullName: string;
  userName: string;
  email: string;
  phone: number;
  password: string;
}

const SignupSchema = yup
  .object({
    fullName: yup.string().required("Name is required"),
    userName: yup.string().required("User Name is required"),
    email: yup.string().required("Email is required"),
    phone: yup
      .number()
      .required()
      .positive()
      .integer()
      .min(10, "Phone number must be minimum 10 characters long"),
    password: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  })
  .required();

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data: IFormInputs) => {
    const { fullName } = JSON.parse(JSON.stringify(data));

    enqueueSnackbar(`Signup Successfully ${fullName}`, {
      autoHideDuration: 5000,
      variant: "success",
      style: {},
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
          <h1>Create Account</h1>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className={styles.formGroup}>
              <label htmlFor="full-name">Full Name</label>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={styles.input}
                    placeholder="Enter Name"
                    error={Boolean(errors?.fullName)}
                  />
                )}
                name="fullName"
                control={control}
                defaultValue=""
              />
              {errors.fullName && (
                <p className={styles.err}>{errors.fullName.message}</p>
              )}
            </Box>
            <Box className={styles.formGroup}>
              <label htmlFor="user-name">Username</label>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={styles.input}
                    placeholder="Enter Username"
                    error={Boolean(errors?.userName)}
                  />
                )}
                name="userName"
                control={control}
                defaultValue=""
              />
              {errors.userName && (
                <p className={styles.err}>{errors.userName.message}</p>
              )}
            </Box>
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
              <label htmlFor="phone">Phone Number*</label>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={styles.input}
                    placeholder="Enter Phone"
                    error={Boolean(errors?.phone)}
                  />
                )}
                name="phone"
                control={control}
              />
              {errors.phone && (
                <p className={styles.err}>{errors.phone.message}</p>
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
                Sign Up
              </button>
              <span>
                or &nbsp;
                <Link className="link" href="/Login">
                  Log In
                </Link>
              </span>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
