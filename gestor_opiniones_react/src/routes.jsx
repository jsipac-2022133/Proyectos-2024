import { AuthPage } from "./Pages/AuthPage/AuthPage"
import { FeedPage } from "./Pages/FeedPage/FeedPage"
import { NotFoundPage } from "./Pages/NotFoundPage/NotFoundPage"

export const routes = [
    {
        path: '/auth',
        element: <AuthPage/>
    },
    {
        path: '*',
        element: <NotFoundPage/>
    },
    {
        path: '/feed/*',
        element: <FeedPage/>
    }
]