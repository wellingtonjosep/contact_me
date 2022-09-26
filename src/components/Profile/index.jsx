import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { UserContext } from "../../Providers/user";

function Profile() {
  const { user, setProfileUser, deleteUser } = useContext(UserContext);

  const [isConf, setIsCof] = useState(false);

  const { register } = useForm({});

  const userDelete = () => {
    deleteUser()
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
          <Typography variant="h6">CONTA</Typography>
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
            onClick={() => setProfileUser(false)}
          >
            X
          </Button>
        </section>
        <form>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            variant="outlined"
            label={`Nome: ${user.name}`}
            name="name"
            autoComplete="name"
            autoFocus
            disabled
            {...register("name")}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label={`Email: ${user.email}`}
            name="email"
            variant="outlined"
            autoComplete="email"
            autoFocus
            disabled
            {...register("email")}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="outlined"
            id="phone"
            label={`Telefone: ${user.phone}`}
            name="phone"
            type="number"
            autoComplete="phone"
            autoFocus
            disabled
            {...register("phone")}
          />

          {isConf === false ? (
            <Button
              color="error"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setIsCof(true)}
            >
              Excluir conta
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                color="green"
                sx={{ marginTop: "10px", fontWeight: "bold" }}
              >
                Tem Certeza ?
              </Typography>
              <Button
                color="success"
                variant="contained"
                onClick={() => userDelete()}
                sx={{ mt: 3, mb: 2, marginLeft: "12px" }}
              >
                Sim
              </Button>
              <Button
                onClick={() => setIsCof(false)}
                color="error"
                variant="contained"
                sx={{ mt: 3, mb: 2, marginLeft: "12px" }}
              >
                Não
              </Button>
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
}

export default Profile;
