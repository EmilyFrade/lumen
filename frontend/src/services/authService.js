import { api } from "./api";

export async function login(email, password) {
    localStorage.removeItem("auth");
    
    const token = btoa(`${email}:${password}`);

    await api.get("/courses", {
        headers: {
            Authorization: `Basic ${token}`
        }
    });

    localStorage.setItem("auth", token);
}

export async function register(user) {
    await api.post("/auth/register", user);
}

export async function getCurrentUser() {
    const response = await api.get("/auth/me");
    return response.data;
}
