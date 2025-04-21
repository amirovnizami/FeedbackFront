import { useState } from "react";
import Logo from "../../Components/Logo";
import Navigation from "../../Components/Navigation";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function LoginUser() {
  const [loginId, setloginId] = useState("");
  var navigate = useNavigate()

  const Login = async () => {
    event.preventDefault();
    var response = await fetch(`https://localhost:5001/Employee/Comments?loginId=${loginId}`, {
      method: "GET"
    })
    if (response.ok) {
      
      navigate(`/chat?loginId=${loginId}`);
      toast.success("Giriş uğurlu oldu!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#28a745", // Success Green
          color: "#fff", // White text
        },
      });
      
    }
    else {
      toast.success("Giriş uğursuz oldu!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#dc3545", // Success Green
          color: "#fff", // White text
        },
      });
    }
  }
  return (
    <>
      <Logo></Logo>
      <Navigation></Navigation>
      <div className=" w-[70%] mx-auto items-center justify-center mt-10">
        <form
          onSubmit={Login}
          className="w-96 p-6 bg-white shadow-lg rounded-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Müraciət ID</label>
            <input
              type="text"
              value={loginId}
              onChange={(e) => setloginId(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Daxil ol
          </button>
        </form>
      </div>
    </>

  );
}
