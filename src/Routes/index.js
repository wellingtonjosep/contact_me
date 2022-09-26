import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/Home";
import LoginPage from "../Pages/Login";
import RegisterPage from "../Pages/Register";

export default function PageRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
        </Routes>
    )
}