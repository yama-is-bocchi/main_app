import { createBrowserRouter } from 'react-router-dom';
import Top from '../components/Top/index.tsx';
import Login from "../components/sub/Login.tsx";
import Sign_up from "../components/sub/Sign_up.tsx";
import Success_signup from "../components/sub/Success_signup.tsx"
import Menu from "../components/sub/Menu.tsx"
import Normal_english from "../components/sub/modes/normal/Normal_english.tsx"
import Normal_japanese from "../components/sub/modes/normal/Normal_japanese.tsx"
import Learn_english from "../components/sub/modes/learn/Learn_english.tsx"
import Learn_japanese from "../components/sub/modes/learn/Learn_japanese.tsx"
import Admin_menu from "../components/sub/admin/Admin_menu.tsx"
import Admin_user_list from "../components/sub/admin/Admin_user_list.tsx"
import Admin_word_list from "../components/sub/admin/Admin_word_list.tsx"
import Admin_edit_user from "../components/sub/admin/edit/Admin_edit_user.tsx"
import Admin_edit_word from "../components/sub/admin/edit/Admin_edit_word.tsx"
import Admin_add_word from "../components/sub/admin/edit/Admin_add_word.tsx"
import Admin_answer_list from "../components/sub/admin/Admin_answer_list.tsx"
import Admin_token_list from "../components/sub/admin/Admin_token_list.tsx"
import Admin_miss_list from "../components/sub/admin/Admin_miss_list.tsx"
import Admin_lock_list from "../components/sub/admin/Admin_lock_list.tsx"

const router = createBrowserRouter([
    { path: "/", element: <Top /> },
    { path: "/Login",element:<Login/>},
    { path: "/Sign_up",element:<Sign_up/>},
    { path: "/Success_signup",element:<Success_signup/>},
    { path: "/Menu",element:<Menu/>},
    { path: "/Menu/Normal_english",element:<Normal_english/>},
    { path: "/Menu/Normal_japanese",element:<Normal_japanese/>},
    { path: "/Menu/Learn_english",element:<Learn_english/>},
    { path: "/Menu/Learn_japanese",element:<Learn_japanese/>},
    { path: "/Admin_menu",element:<Admin_menu/>},
    { path: "/Admin_menu/Admin_user_list",element:<Admin_user_list/>},
    { path: "/Admin_menu/Admin_word_list",element:<Admin_word_list/>},
    { path: "/Admin_menu/Admin_user_list/edit_user",element:<Admin_edit_user/>},
    { path: "/Admin_menu/Admin_word_list/edit_word",element:<Admin_edit_word/>},
    { path: "/Admin_menu/Admin_word_list/add_word",element:<Admin_add_word/>},
    { path: "/Admin_menu/Admin_answer_list",element:<Admin_answer_list/>},
    { path: "/Admin_menu/Admin_token_list",element:<Admin_token_list/>},
    { path: "/Admin_menu/Admin_miss_list",element:<Admin_miss_list/>},
    { path: "/Admin_menu/Admin_lock_list",element:<Admin_lock_list/>},
]);

export default router;