import axios from "axios";

export const api = axios.create({
    baseURL: "https://contact-me-ap.herokuapp.com"
})