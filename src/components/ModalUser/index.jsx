import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { UserContext } from "../../Providers/user";

function ModalUser() {
  
  const { setModalUser, user, updateUser  } = useContext(UserContext)

  const schema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email("Email Inválido"),
    phone: yup.string(),
    password: yup
      .string()
      .min(8, "Mínimo de 8 digitos")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmitFunction(data) {
    updateUser(data)
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        zIndex: 100000,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(0,0,0,0.55)",
      }}
    >
      <Box
        sx={{
          padding: 5,
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "400px",
          backgroundColor: "lightgray",
          borderRadius: 4,
          position: "relative",
        }}
      >
        <section>
          <Typography variant="h6">ATUALIZAR USUARIO</Typography>
          <Button
            sx={{
              position: "absolute",
              right: 40,
              top: "31px",
              color: "red",
              borderColor: "red",
              fontVariant: "ordinal",
              fontWeight: "bold",
              fontSize: "21px",
            }}
            variant="outlined"
            onClick={() => setModalUser(false)}
          >
            X
          </Button>
        </section>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            variant="outlined"
            label={user.name}
            name="name"
            autoComplete="name"
            autoFocus
            {...register("name")}
          />
          <label>
            {!!errors.name?.message && (
              <span className="span-register"> {errors.name.message}</span>
            )}
          </label>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label={user.email}
            name="email"
            variant="outlined"
            autoComplete="email"
            autoFocus
            {...register("email")}
          />
          <label>
            {!!errors.email?.message && (
              <span className="span-register"> {errors.email.message}</span>
            )}
          </label>
          <TextField
            margin="normal"
            fullWidth
            variant="outlined"
            id="phone"
            label={user.phone}
            name="phone"
            type="number"
            autoComplete="phone"
            autoFocus
            {...register("phone")}
          />
          <label>
            {!!errors.phone?.message && (
              <span className="span-register"> {errors.phone.message}</span>
            )}
          </label>
          <TextField
            margin="normal"
            fullWidth
            variant="outlined"
            id="password"
            label={"Nova senha"}
            name="password"
            type="password"
            autoComplete="password"
            autoFocus
            {...register("password")}
          />
          <label>
            {!!errors.password?.message && (
              <span className="span-register"> {errors.password.message}</span>
            )}
          </label>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrar
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default ModalUser;
