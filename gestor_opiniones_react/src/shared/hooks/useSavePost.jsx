import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { savePostRequest } from "../../services/api"

export const useSavePost = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const savePost = async (post) => {
        setIsLoading(true)
        const response = await savePostRequest(post)
        setIsLoading(false)
        if(response.error){
            return alert('Error al guardar posts')
        }
        navigate('/feed/posts')
    }

    
  return {
    isLoading,
    savePost
  }
}
