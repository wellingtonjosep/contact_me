import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../Services/api";

export const ContactContext = createContext([]);

export const ContactProviders = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const [modalCreate, setModalCreate] = useState(false);

  async function getContacts() {
    const token = localStorage.getItem("token");
    api
      .get("/contacts/user", {
        headers: {
          Authorization: `baerer ${token}`,
        },
      })
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function createContact(data) {
    const token = localStorage.getItem("token");

    const loading = toast.loading("Carregando...");
    console.log(data)
    api
      .post("/contacts",data, {
        headers: {
          Authorization: `baerer ${token}`,
        },
      })
      .then((res) => {
        console.log(res)
        toast.update(loading, {
          render: "Contato adicionado",
          autoClose: 1000,
          type: "success",
          isLoading: false,
        });

        setModalCreate(false)
        getContacts()
      })
      .catch((err) => {
        console.log(err);
        toast.update(loading, {
          render: "Erro ao tentar adicionar um contato",
          autoClose: 1000,
          type: "error",
          isLoading: false,
        });
      });
  }

  return (
    <ContactContext.Provider
      value={{
        getContacts,
        setModalCreate,
        createContact,
        contacts,
        modalCreate,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
