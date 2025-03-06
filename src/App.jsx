import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './routes/Routes'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <>
      <div>
        <RouterProvider router={router}/>
        <ToastContainer />
      </div> 
    </>
  )
}

export default App
