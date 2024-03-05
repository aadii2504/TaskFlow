import { useState } from 'react'
import Navbar from './components/Navbar'

function App() {
 

  return (
    <>
    <Navbar/>
      <div className="container mx-auto rounded-lg">
        <div className="bg-violet-100">
          <h1>Your Todos</h1>
        </div>
      </div>
    </>
  )
}

export default App
