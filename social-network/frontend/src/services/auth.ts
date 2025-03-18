import axios from "axios";
import Login from "../models/users/Login";
import Signup from "../models/users/Signup";

class Auth {
    async login(login: Login) {
        const response = await axios.post<{jwt: string}>(`${import.meta.env.VITE_REST_SERVER_URL_SAFE}/auth/login`, {
            username: login.username,
            password: login.password
        });
    return response.data.jwt;
    }
    
    async signup(signup: Signup) {
        const response = await axios.post<{jwt: string}>(`${import.meta.env.VITE_REST_SERVER_URL_SAFE}/auth/signup`, signup);
    return response.data.jwt;
    }

}
const auth = new Auth();
export default auth;