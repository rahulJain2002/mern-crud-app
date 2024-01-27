import './App.css'
import { Routes,Route } from 'react-router-dom'
import GetUsers from './components/GetUsers'
import AddUser from './components/AddUser'
import UpdateUser from './components/UpdateUser'
import ErrorPage from './components/ErrorPage'




function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<GetUsers/>}/>
        <Route path='/create' element={<AddUser/>}/>
        <Route path='/updateone/:id' element={<UpdateUser/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </>
  )
}

export default App
