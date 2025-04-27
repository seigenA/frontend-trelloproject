import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import BoardPage from '../pages/BoardPage';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <LoginForm />,
    },
    {
        path: '/register',
        element: <RegisterForm />,
    },
    {
        path: '/board/:boardId',  // ✅ так ты передаёшь ID доски через URL
        element: <BoardPage />,
    }
]);

export default router;
