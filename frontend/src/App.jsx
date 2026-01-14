import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/courses"
                        element={
                            <PrivateRoute><Courses /></PrivateRoute>
                        }
                    />
                    <Route
                        path="/courses/add"
                        element={
                            <PrivateRoute><AddCourse /></PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
