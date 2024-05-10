import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { routes } from './routes'
import { useRoutes } from 'react-router-dom'

function App() {
  const elementRoutes = useRoutes(routes)

  return (
    <>
      {elementRoutes}
    </>
  )
}

export default App
