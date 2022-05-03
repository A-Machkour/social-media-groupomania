import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

export default function SignUpForm(props) {
    const schema = Yup.object({
        username: Yup.string().required("Veuillez saisir votre nom d'utilisateur"),
        email: Yup.string()
            .email("Veuillez saisir un e-mail valide")
            .required("Veuillez saisir votre e-mail"),
        password: Yup.string()
            .required("Veuillez saisir un mot de passe")
            .matches(
                /^(?=.{6,}$)(?=(?:.*?[A-Z]){1})(?=.*?[a-z])(?=(?:.*?[0-9]){1})(?=.*[*.-_+=%!?$@]).*$/,
                "Doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre"
            ),
        confirmPassword: Yup.string()
            .required("Veuillez confirmer votre mot de passe")
            .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
    }).required();
    
    const {
        register,
        handleSubmit,
        formState:{ errors } 
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });
    
    const submitForm = data => {
        // fetch('http://localhost:5000/api/users/register', {
        //     method: 'POST',
        //     headers: {
        //     'Content-type': 'application/json',
        // },
        //     body: JSON.stringify({
        //         username: data.username,
        //         email: data.email,
        //         password: data.password,
        //     })
        // }).then(response => response.json())
        // .then(
        //     (json) => {
        //         console.log(json)
        //         if(json.message === "Email déjà enregistré"){
        //             props.setMessageError(json.message)                
        //         }else{
        //             props.setMessageSuccess("Inscription réussie")
        //             props.setMessageError("")
        //             props.setSignUp(false)
        //             props.setSignIn(true)
                    
        //         }
        //     }
        // )
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}api/users/register`,
            withCredentials: true,
            data: {
                username: data.username,
                email: data.email,
                password: data.password,
            }
        })
        .then(res => {
            if(res.data.message === "Email déjà enregistré"){
                props.setMessageError(res.data.message)
            }else{
                props.setMessageSuccess("Inscription réussie")
                props.setMessageError("")
                props.setSignUp(false)
                props.setSignIn(true)
            }
        })
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(submitForm)} sx={{ mt: 1 }}>
            <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nom d'utilisateur"
                autoComplete="username"
                autoFocus
                {...register("username")}
                error={errors.username?.message == null ? false : true} 
                helperText={errors.username?.message}
            />
            <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                autoComplete="email"
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
            <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                label="Confirmation du mot de passe"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message == null ? false : true} 
                helperText={errors.confirmPassword?.message}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                S'inscrire
            </Button>
        </Box>
    );
}