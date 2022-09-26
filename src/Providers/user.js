import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../Services/api";

export const UserContext = createContext([]);

export const UserProviders = ({ children }) => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  async function loginUser(data) {
    const loading = toast.loading("Carregando...");

    api
      .post("/users/login", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        localStorage.clear();

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.userId);

        toast.update(loading, {
          render: "Sucesso !",
          autoClose: 1000,
          type: "success",
          isLoading: false,
        });

        getUser(res.data.userId);

        navigate("/home");
      })
      .catch((err) => {
        toast.update(loading, {
          render: "Senha ou email invalido",
          autoClose: 1000,
          type: "error",
          isLoading: false,
        });
      });
  }

  async function registerUser(data) {
    const loading = toast.loading("Carregando...");

    api
      .post("/users", data)
      .then((res) => {
        toast.update(loading, {
          render: "Conta cadastrada",
          autoClose: 1000,
          type: "success",
          isLoading: false,
        });
        navigate("/");
      })
      .catch((err) => {
        toast.update(loading, {
          render: "Erro ao tentar realizar o cadastro",
          autoClose: 1000,
          type: "error",
          isLoading: false,
        });
      });
  }

  async function getUser(id) {
    const token = localStorage.getItem("token");
    api
      .get(`/users/${id}`, {
        headers: {
          Authorization: `baerer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <UserContext.Provider
      value={{
        loginUser,
        registerUser,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
