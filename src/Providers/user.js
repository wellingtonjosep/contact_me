import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../Services/api";

export const UserContext = createContext([]);

export const UserProviders = ({ children }) => {
  const [user, setUser] = useState({});

  const [modalUser, setModalUser] = useState(false);

  const [ProfileUser, setProfileUser] = useState(false);

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

  async function updateUser(data) {
    const token = localStorage.getItem("token");

    const newContact = {
      name: data.name || user.name,
      email: data.email || user.email,
      phone: data.phone || user.phone,
      password: data.password,
    };

    const loading = toast.loading("Carregando...");

    api
      .patch(`/users/${user.id}`, newContact, {
        headers: {
          Authorization: `baerer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.update(loading, {
          render: "Conta atualizado",
          autoClose: 1000,
          type: "success",
          isLoading: false,
        });

        setModalUser(false);
        getUser(user.id);
      })
      .catch((err) => {
        console.log(err);
        toast.update(loading, {
          render: "Erro ao tentar atualizar sua conta",
          autoClose: 1000,
          type: "error",
          isLoading: false,
        });
      });
  }

  function deleteUser() {
    const token = localStorage.getItem("token");
    const loading = toast.loading("Carregando...");

    api
      .delete(`/users/${user.id}`, {
        headers: {
          Authorization: `baerer ${token}`,
        },
      })
      .then((res) => {
        toast.update(loading, {
          render: "Conta excluida com sucesso",
          autoClose: 1000,
          type: "success",
          isLoading: false,
        });

        localStorage.clear()
        navigate("/")
      })
      .catch((err) => {
        toast.update(loading, {
          render: "Erro ao tentar excluir sua conta",
          autoClose: 1000,
          type: "error",
          isLoading: false,
        });
      });
  }

  return (
    <UserContext.Provider
      value={{
        loginUser,
        registerUser,
        getUser,
        setModalUser,
        updateUser,
        setProfileUser,
        deleteUser,
        ProfileUser, 
        modalUser,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
