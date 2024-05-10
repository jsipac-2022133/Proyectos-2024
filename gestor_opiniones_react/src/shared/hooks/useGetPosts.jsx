import { useState } from "react"
import { getPostsRequest } from "../../services/api"

export const useGetPosts = () => {
    const [posts, setPosts] = useState(null)

    const getPosts = async () => {
        const response = await getPostsRequest()
        if (response.error) {
            alert(
                response.err.response.data.message ||
                'Error al obtener los posts'
            )
        }
        setPosts(response.data)
    }
    return {
        posts,
        isFetching: !posts,
        getPosts
    }
}