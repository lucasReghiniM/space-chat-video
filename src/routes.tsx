import {
    createBrowserRouter,
} from "react-router-dom";

//pages
import Home from './pages/Home'
import Chat from './pages/Chat'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/chat/:id',
        element: <Chat />
    }
])

export default router