import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import Todo from './components/todo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Todo/>
    </>
  )
}

export default App