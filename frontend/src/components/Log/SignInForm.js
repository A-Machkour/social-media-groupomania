import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

export default function SignInForm(props) {
  const schema = Yup.object({
    email: Yup.string()
      .email("Veuillez saisir un e-mail valide")
      .required("Veuillez saisir votre e-mail"),
    password: Yup.string().required("Veuillez saisir un mot de passe"),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const submitForm = data => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/users/login`,
      withCredentials: true,
      data: {
        email: data.email,
        password: data.password,
      },
    }).then(res => {
      if (
        res.data.message === "Email inconnu" ||
        res.data.message === "Mot de passe incorrect"
      ) {
        props.setMessageError(res.data.message);
      } else {
        props.setMessageError("");
      }
      props.setMessageSuccess("");
      window.location.reload();
    });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(submitForm)}
      sx={{ mt: 1 }}
    >
      <TextField
        variant="standard"
        margin="normal"
        required
        fullWidth
        id="email"
        label="E-mail"
        autoComplete="email"
        autoFocus
        {...register("email")}
        error={errors.email?.message == null ? false : true}
        helperText={errors.email?.message}
      />
      <TextField
        variant="standard"
        margin="normal"
        required
        fullWidth
        label="Mot de passe"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register("password")}
        error={errors.password?.message == null ? false : true}
        helperText={errors.password?.message}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Se connecter
      </Button>
    </Box>
  );
}
