import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/header"
import ModalCreate from "../../components/ModalCreate"
import ModalUpdate from "../../components/ModalUpdate"
import TabPanels from "../../components/TabPanel"
import { ContactContext } from "../../Providers/contact"
import { UserContext } from "../../Providers/user"
import "./styles.css"

function HomePage() {

    const { modalCreate, modalUpdate } = useContext(ContactContext)

    const { getUser } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        const userId = localStorage.getItem("id")

        getUser(userId)
    },[])

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/")
        }
    },[])

    return (
        <>
        <Header/>
        <TabPanels/>
        {
            modalCreate === true && <ModalCreate/>
        }
        {
            modalUpdate === true && <ModalUpdate/>
        }
        </>
    )
}

export default HomePage