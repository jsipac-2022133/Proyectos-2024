import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { getChannelSettingsRequest, updateChannelSettingRequest } from "../../services/api"

export const useChannelSettings = () => {
    const [channelSettings, setChannelSettings] = useState(null)

    const fetchChannelSettings = async()=>{
        const response = await getChannelSettingsRequest()
        if(response.error){
            return toast.error(
                response.err?.response?.data ||
                'Error al obtener las configuraciones actuales del canal'
            )
        }
        setChannelSettings(
            {
                username: response.data.username,
                title: response.data.title,
                description: response.data.description,
                avatarUrl: response.data.avatarUrl,
                streamKey: response.data.streamKey
            }
        )
    }

    const saveSettings = async (data)=>{
        const response = await updateChannelSettingRequest(data)
        if(response.error){
            return toast.error(
                response.err?.response?.data ||
                'Error al actualizar la configuración del canal'
            )
        }
        toast.success('Configuraciones del canal guardadas')
    }

    useEffect(()=>{
      fetchChannelSettings()
    }, [])

    return {
    isFetching: !channelSettings,
    channelSettings,
    saveSettings
  }
}