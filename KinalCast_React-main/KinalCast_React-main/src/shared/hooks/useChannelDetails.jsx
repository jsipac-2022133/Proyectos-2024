import { useState } from "react"
import toast from "react-hot-toast"
import {getChannelDetailsRequest} from '../../services/api.js'

export const useChannelDetails = () => {
    const [channelDetails, setChannelDetails] = useState(null)
    const getChannelDetails=async(id)=>{
        const response =await getChannelDetailsRequest(id)
        if(response.error){
            return toast.error(
                response.err?.response?.data ||
                'Error al obtener los detalles del canal'
            )
        }
        setChannelDetails(response.data)
    }
  
    return {
        channelDetails,
    isFetching: !channelDetails,
    getChannelDetails
    }
    
  
}
