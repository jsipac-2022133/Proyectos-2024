import { Channels } from "./channel/Channels.jsx"
import { ChannelView } from "./channel/ChannelView.jsx"
import { Route, Routes } from 'react-router-dom'
import { SettingsContent } from "./SettingsContent.jsx"

export const DashboardContent = ({channels, getChannels}) => {
  return (
    <div className="content-container">
      <Routes>
        <Route path="settings" element={<SettingsContent />}/>
        <Route path='channels' element={<Channels channels={channels}/>}/>
        <Route path='channel/:id' element={ <ChannelView getChannels={getChannels}/>}/>
      </Routes>
    </div>
  )
}
