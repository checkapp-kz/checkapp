import axios from "axios";
import config from '../config';


interface LoginResponse {
    access_token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${config.BACKEND_URL}/auth/login`, { email, password });
        localStorage.setItem("token", response.data.access_token);
        return response.data;
    } catch (error: any) {
        throw error.response ? error.response.data : error.message;
    }
};

export const register = async (email: string, password: string) => {
    try {
        return await axios.post(`${config.BACKEND_URL}/auth/register`, { email, password });
    } catch (error: any) {
        throw error.response ? error.response.data : error.message;
    }
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const response = await axios.get(`${config.BACKEND_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return null;
    }
};
