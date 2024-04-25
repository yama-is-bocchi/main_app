import { createBrowserRouter } from 'react-router-dom';
import Top from '../components/Top/index.tsx';
import Login from "../components/sub/Login.tsx";
import Sign_up from "../components/sub/Sign_up.tsx";
import Success_signup from "../components/sub/Success_signup.tsx"

const router = createBrowserRouter([
    { path: "/", element: <Top /> },
    { path: "/Login",element:<Login/>},
    { path: "/Sign_up",element:<Sign_up/>},
    { path: "/Success_signup",element:<Success_signup/>},
]);

export default router;