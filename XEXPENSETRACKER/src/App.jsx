import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import AddExpenseModal from './components/AddExpenseModal/AddExpenseModal'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/" element={<AddExpenseModal />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
