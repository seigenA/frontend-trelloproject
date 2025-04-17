import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import BoardPage from '../pages/BoardPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/board/:boardId',
        element: <BoardPage />,
    }
])

export default router;
