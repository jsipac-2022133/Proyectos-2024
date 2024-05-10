import { useState } from "react"
import { updatePostRequest } from "../../services/api.js"

export const useUpdatePost = () => {
    const [updatedPost, setUpdatePost] = useState(null)

    const updatePost = async(id, post)=>{
        const response = await updatePostRequest(id, post)
        if(response.error){
            alert('Error al actualizar el post')
        }
        setUpdatePost(response.data)
        alert('Actualizado correctamente')
    }
  return {
    updatedPost,
    isFetching: !updatedPost, 
    updatePost
  }
}
