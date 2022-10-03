import "./styles.css"
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import logo from "../../assets/logo.png"
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useEffect } from "react";
import { UserContext } from "../../Providers/user";
import { useNavigate } from "react-router-dom/dist";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a7d5d5",
    }
  }
});

export default function SignInSide() {

  const { registerUser } = useContext(UserContext)

  const navigate = useNavigate()

  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório!"),
    email: yup.string().email("Email Inválido").required("Campo obrigatório!"),
    phone: yup.string().max(10,"Tamanho máximo 10 dígitos").required("Campo obrigatório!"),
    confEmail: yup
      .string()
      .oneOf([yup.ref("email")], "Emails diferentes")
      .required("Campo obrigatório!"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 digitos")
      .required("Campo obrigatório!"),
    confPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas Diferentes")
      .required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmitFunction(data) {
    registerUser(data)
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home")
    }
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img className="logo-site" src={logo} alt="logotipo site" />
            <Typography component="h1" variant="h5" className="login-title" >
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmitFunction)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Nome completo"
                name="name"
                autoComplete="name"
                autoFocus
                {...register("name")}
              />
              <label>
                {!!errors.name?.message && <span className="span-register"> {errors.name.message}</span>}
              </label>
              <TextField
                margin="normal"
                fullWidth
                id="telefone"
                label="Telefone"
                name="telefone"
                type="tel"
                autoComplete="telefone"
                autoFocus
                {...register("phone")}
              />
              <label>
                {!!errors.phone?.message && <span className="span-register"> {errors.phone.message}</span>}
              </label>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email")}
              />
              <label>
                {!!errors.email?.message && <span className="span-register"> {errors.email.message}</span>}
              </label>
              <TextField
                margin="normal"
                fullWidth
                id="confEmail"
                label="Confirmar email"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("confEmail")}
              />
              <label>
                {!!errors.confEmail?.message && <span className="span-register"> {errors.confEmail.message}</span>}
              </label>
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password")}
              />
              <label>
                {!!errors.password?.message && <span className="span-register"> {errors.password.message}</span>}
              </label>
              <TextField
                margin="normal"
                fullWidth
                name="confPassword"
                label="Confirmar senha"
                type="password" 
                id="confPassword"
                autoComplete="current-password"
                {...register("confPassword")}
                />
              <label>
                {!!errors.confPassword?.message && <span className="span-register"> {errors.confPassword.message}</span>}
              </label>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrar
              </Button>
              <Grid container sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item>
                <Link href="/" variant="body2" sx={{ textDecoration: "none", color: "blue" }}>
                    {"Já está cadastrado? clique aqui"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}