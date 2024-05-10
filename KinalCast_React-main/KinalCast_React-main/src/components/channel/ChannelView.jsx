import { ReactFlvPlayer } from "react-flv-player"
import { useChannelDetails } from "../../shared/hooks/useChannelDetails"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const Stream=({streamUrl})=>{
  return(
    <div className="channel-video-container">
          <ReactFlvPlayer width="100%" heigth='100%' url={streamUrl}/>
    </div>
  )
}

export const ChannelView = () => {
  const {channelDetails, isFetching, getChannelDetails}=useChannelDetails()
  const {id} = useParams()

  useEffect(()=>{
    getChannelDetails(id)
  },[])

  if(isFetching){
    return (
      <div className="channel-offline-placeholder">
        <span>Cargando....</span>
      </div>
    )
  }

  return (
    <div className="channel-container">
      <div className="channel-video-description-section">
        {
          channelDetails.isOnline ? (
            <Stream streamUrl={channelDetails.streamUrl}/>
          ):(
            <div className="channel-offline-placeholder">
              <span>Channel is offline</span>
            </div>
          )
        }
      </div>
    </div>
  )
}
