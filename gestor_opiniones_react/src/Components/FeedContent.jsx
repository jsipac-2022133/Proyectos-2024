import { Route, Routes } from "react-router-dom"
import { Post } from "./Post"
import { NotFoundPage } from "../Pages/NotFoundPage/NotFoundPage"
import { useGetPosts } from "../shared/hooks/useGetPosts"
import { useEffect } from "react"
import { ClockLoader } from "react-spinners"
import { PostForm } from "./PostForm"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

export const FeedContent = () => {
    const { posts, getPosts, isFetching } = useGetPosts()

    useEffect(() => {
        getPosts()
    }, [posts])

    if (isFetching) {
        return (
            <div className="container d-flex align-items-center justify-content-center vh-100">
                <ClockLoader />
            </div>
        )
    }
    return (
        <div>
            <Routes>
                <Route path="posts" element={<Post posts={posts} getPosts={getPosts} />} errorElement={NotFoundPage} />
                <Route path="newPost" element={<PostForm />} />
            </Routes>
        </div>
    )
}