import { api } from "./api";

export async function createCourse(course) {
    const response = await api.post("/courses", course);
    return response.data;
}

export async function getCourses() {
    const response = await api.get("/courses");
    return response.data;
}

export async function getCourseById(id) {
    const response = await api.get(`/courses/${id}`);
    return response.data;
}

export async function updateCourse(id, course) {
    const response = await api.put(`/courses/${id}`, course);
    return response.data;
}

export async function deleteCourse(id) {
    await api.delete(`/courses/${id}`);
}

export async function getCoursesByCategory(category) {
    const response = await api.get(`/courses/category/${category}`);
    return response.data;
}

