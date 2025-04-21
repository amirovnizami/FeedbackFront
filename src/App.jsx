import './index.css';
import { ToastContainer } from 'react-toastify';
import Query from './Pages/User/Query';
import Login from './Pages/Admin/login';
import LoginUser from './Pages/User/LoginUser';
import Chat from './Pages/Chat';
import Modal from './Components/modal';
import FeedbackTable from './Pages/Admin/Feedbacks';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className='overflow-hidden'>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/feedbackTable" element={<FeedbackTable />} />
          {/* <Route path="/login" element={<LoginUser />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/modal" element={<Modal />} /> */}
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
