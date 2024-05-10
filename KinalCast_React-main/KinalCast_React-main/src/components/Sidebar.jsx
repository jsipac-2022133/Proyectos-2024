export const Sidebar = () => {
  //Codigo memomentaneo
  const channels = [
    {id: '22', username: 'llutin', isOnline: false},
    {id: '23', username: 'jcruz', isOnline: true}
  ]
  //Codigo memomentaneo

  return (
    <div className="sidebar-container">
      <span className="sidebar-title">For you</span>
      <span className="sidebar-subtitle">Followed Channels:</span>
      {
        channels.map((channel)=> {
          return (
            <div key={channel.id} className="sidebar-list-item">
              <span className="sidebar-list-username">{channel.username}</span>
              <span
                style={
                  {color: channel.isOnline ? 'green' : 'red'}
                }
              >
                { channel.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          )
        })
      }
    </div>
  )
}
