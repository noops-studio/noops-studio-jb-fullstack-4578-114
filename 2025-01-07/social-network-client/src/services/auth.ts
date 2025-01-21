import axios from "axios";
import Login from "../models/users/Login";

class Auth {
    async login(login: Login) {
        const response = await axios.post<{jwt: string}>(`${import.meta.env.VITE_REST_SERVER_URL_SAFE}/auth/login`, login);
    return response.data.jwt;
    }
}
const auth = new Auth();
export default auth;