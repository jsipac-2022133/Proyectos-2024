/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import toast from "react-hot-toast";
import { getChannelsRequest } from "../../services/api.js";

export const useChannels = () => {
    const [channels, setChannels] = useState([])

    const getChannels = async(isLogged = false)=>{
        const channelsData = await getChannelsRequest()

        if(channelsData.error){
            return toast.error(
                channelsData.err?.response?.data ||
                'Error al obtener los canales'
            )
        }
        if(!isLogged){
            return setChannels(
                {
                    channels: channelsData.data?.channels
                }
            )
        }
    } 
  return {
    getChannels,
    isFetching: !Boolean(channels),
    allChannels: channels?.channels
  }
}
