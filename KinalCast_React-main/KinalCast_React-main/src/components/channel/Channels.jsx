/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useNavigate } from "react-router-dom"
import { ChannelCard } from "./ChannelCard.jsx"

export const Channels = ({channels = []}) => {
  const navigate = useNavigate()

  const handleNavigateToChannel = (id)=>{
    navigate(`/channel/${id}`)
  }
  return (
    <div className="channels-container">
      {
        channels.map((channel)=> (
          <ChannelCard 
            key={channel.id}
            id={channel.id}
            title={channel.title}
            username={channel.username}
            isOnline={channel.isOnline}
            avatarUrl={channel.avatarUrl}
            navigateToChannelHandler={handleNavigateToChannel}
          />
        ))
      }
    </div>
  )
}
