import { form } from "framer-motion/client";
import Logo from "../../Components/Logo";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({});

    const handleInputChange = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const login = async () => {
        console.log(formData);
        try {
            const response = await fetch(`https://localhost:5001/Admin/Users/Login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                var data = await response.json()
                var token = data.result.token
                console.log(token);
                localStorage.setItem('accessToken', token);
                navigate('/feedbackTable')
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
        catch (error) {
            console.error("Occured an error!")
        }

    }

    return (
        <>
            <Logo></Logo>
            <div className="flex justify-center items-center h-screen bg-white">
                <div className="w-full max-w-xs flex flex-col gap-4">
                    <input
                        name="email"
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        type="email"
                        placeholder="E-mail"
                        className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500"
                    />
                    <input
                        name="password"
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        type="password"
                        placeholder="Parol"
                        className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500"
                    />
                    <button
                        onClick={() => {
                            login()
                        }}
                        className="bg-sky-500  hover:bg-sky-600 text-white font-bold py-3 rounded-md">
                        Daxil ol
                    </button>
                </div>
            </div>
        </>

    );
}
export default Login