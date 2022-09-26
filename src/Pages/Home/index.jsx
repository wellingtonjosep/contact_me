import { useContext } from "react"
import Header from "../../components/header"
import ModalCreate from "../../components/ModalCreate"
import TabPanels from "../../components/TabPanel"
import { ContactContext } from "../../Providers/contact"
import "./styles.css"

function HomePage() {

    const { modalCreate } = useContext(ContactContext)

    return (
        <>
        <Header/>
        <TabPanels/>
        {
            modalCreate === true && <ModalCreate/>
        }
        </>
    )
}

export default HomePage