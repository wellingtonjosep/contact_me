import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../Services/api";

export const ContactContext = createContext([]);

export const ContactProviders = ({ children }) => {
  
  const [contacts, setContacts] = useState([]);

  const [modalCreate, setModalCreate] = useState(false);

  const [modalUpdate, setModalUpdate] = useState(false);

  const [contact, setContact] = useState({})

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

  async function updateContact(data) {
    const token = localStorage.getItem("token");

    const newContact = {
      name: data.name || contact.name,
      email: data.email || contact.email,
      phone: data.phone || contact.phone
    }

    const loading = toast.loading("Carregando...");

    api
      .patch(`/contacts/${contact.id}`,newContact, {
        headers: {
          Authorization: `baerer ${token}`,
        },
      })
      .then((res) => {
        console.log(res)
        toast.update(loading, {
          render: "Contato atualizado",
          autoClose: 1000,
          type: "success",
          isLoading: false,
        });

        setModalUpdate(false)
        getContacts()
      })
      .catch((err) => {
        console.log(err);
        toast.update(loading, {
          render: "Erro ao tentar atualizar um contato",
          autoClose: 1000,
          type: "error",
          isLoading: false,
        });
      });
  }

  async function deleteContact(data) {
    const token = localStorage.getItem("token");

    const loading = toast.loading("Carregando...");

    api
      .delete(`/contacts/${data.id}`, {
        headers: {
          Authorization: `baerer ${token}`,
        },
      })
      .then((res) => {
        console.log(res)
        toast.update(loading, {
          render: "Contato deletado",
          autoClose: 1000,
          type: "success",
          isLoading: false,
        });

        setModalUpdate(false)
        getContacts()
      })
      .catch((err) => {
        console.log(err);
        toast.update(loading, {
          render: "Erro ao tentar deletar um contato",
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
        setModalUpdate,
        updateContact,
        deleteContact,
        setContact,
        contact, 
        modalUpdate, 
        contacts,
        modalCreate,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
