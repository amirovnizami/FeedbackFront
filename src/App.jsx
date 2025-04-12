import './index.css';
import './Pages/Query'
import { ToastContainer } from 'react-toastify';
import Query from './Pages/Query';
import LoginUser from './Pages/loginUser';
import Chat from './Pages/Chat'
import Modal from './Components/modal';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className='overflow-hidden'>
      <Router>
        <Routes>
          <Route path="/" element={<Query />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/modal" element={<Modal />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default App
