import './dashboard.css'
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'
import { DashboardContent } from '../../components/DashboardContent.jsx'
import { useChannels } from '../../shared/hooks/useChannels.jsx'
import { useEffect } from 'react'

export const Dashboard = () => {
  const { getChannels, isFetching, allChannels } = useChannels()

  useEffect(()=> {
    getChannels(false)
  }, [])

  return (
    <div className='dashboard-container'>
      <Navbar />
      <Sidebar />
      <DashboardContent channels={allChannels}/>
    </div>
  )
}
