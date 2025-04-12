import React, { useState, useEffect } from 'react';
import Logo from '../Components/Logo';
import { useLocation } from "react-router-dom";


const Chat = () => {
    useEffect(() => {
        getData();
    }, []);
    const [formData, setFormData] = useState({
        comment: "",
        uploadFile: null,
    });
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const loginId = params.get("loginId")
    const [comments, setComments] = useState([])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            uploadFile: e.target.files[0],
        }));
    };



    const getData = async () => {
        var response = await fetch(`https://localhost:5001/Employee/Comments?loginId=${loginId}`, {
            method: "GET"
        })
        var data = await response.json()
        var comments = data.result.comments
        setComments(comments)
        console.log(comments);
    }
    const sendMessage = async () => {
        const form = new FormData();
        form.append("loginId",loginId );
        form.append("comment", formData.comment);
        form.append("uploadFile", formData.uploadFile);
        console.log(form)
    try {
        const response = await fetch("https://localhost:5001/Employee/Comments", {
          method: "POST",
          body: form,
        });

        if (response.ok) {
          getData()
        } else {
          alert("There was an issue submitting your feedback.");
        }
      } catch (error) {
        alert("Error occurred while submitting the feedback.");
      }
    }

    return (
        <>
            <Logo></Logo>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">

                <div className="flex justify-start gap-3 items-center mb-6 pb-4 border-b border-gray-200">
                    <div className="text-sm">
                        <span className="font-bold text-[#00A0DF]">Müraciət ID-si </span>{loginId}
                    </div>

                    <div className="text-sm">
                        <span className="font-bold text-[#00A0DF]">Status</span> <span className="text-green-500">Yeni</span>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col flex-end gap-4 mb-4">
                    {comments.map((item) => (
                        <div className="flex items-center w-[55%] ml-[360px] text-white bg-[#0088BE] p-[12px] rounded-[20px]">
                            {item.text}
                        </div>
                    ))}
                </div>
                {/* New Message Section */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                        <input
                            name='comment'
                            type="text"
                            value={formData.comment}
                            onChange={handleInputChange}
                            placeholder="Bura yeni mesaj yazın"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                        />
                        <button type='button' onClick={sendMessage} className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
                            <span className="text-xl">➤</span>
                        </button>
                        <input
                            type="file"
                            id="uploadFile"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label htmlFor="uploadFile" className="cursor-pointer">
                            <img className="w-7 ml-2" src="/src/assets/Frame.png" />
                        </label>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Chat;