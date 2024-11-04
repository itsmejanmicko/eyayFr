
import { Route, Routes } from 'react-router-dom'
import Chat from './components/Chat'

export default function App() {
  return (
  <Routes>
      <Route path = "/" element = {<Chat />} />
  </Routes>
  )
}
