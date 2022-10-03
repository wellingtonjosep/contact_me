import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { ContactContext } from "../../Providers/contact";

function ModalCreate() {
  const { setModalCreate, createContact } = useContext(ContactContext);

  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório!"),
    email: yup.string().email("Email Inválido").required("Campo obrigatório!"),
    phone: yup.string().max(10,"Tamanho máximo 10 dígitos").required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmitFunction(data) {
    createContact(data);
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
          <Typography variant="h6">ADICIONAR NOVO CONTATO</Typography>
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
            onClick={() => setModalCreate(false)}
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
            label="Nome"
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
            label="Email"
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
            id="telefone"
            label="Telefone"
            name="telefone"
            type="number"
            autoComplete="telefone"
            autoFocus
            {...register("phone")}
          />
          <label>
            {!!errors.phone?.message && (
              <span className="span-register"> {errors.phone.message}</span>
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

export default ModalCreate;
