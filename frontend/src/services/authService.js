import { api } from "./api";

export async function login(email, password) {
    localStorage.removeItem("auth");
    
    const token = btoa(`${email}:${password}`);

    await api.get("/categories", {
        headers: {
            Authorization: `Basic ${token}`
        }
    });

    localStorage.setItem("auth", token);
}

export async function register(user) {
    await api.post("/auth/register", user);
}
