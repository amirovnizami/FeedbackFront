import React, { useState, useEffect } from 'react';
import Logo from '../Components/Logo';
import { useLocation } from "react-router-dom";
const statusColors = {
    1: "text-green-500",  // Yeni
    2: "text-gray-500",   // Tamamlandı
    3: "text-red-500",    // Cavab Gözlənilir
    4: "text-blue-500",   // Davam edir
};

const Chat = () => {
    useEffect(() => {
        getData();
    }, []);
    const [formData, setFormData] = useState({
        comment: "",
        uploadFile: null
    });
    const location = useLocation();
    const isAdminUser = location.state?.isAdminUser ?? false;
    const statusId = location.state?.statusId ?? 1;
    
    const params = new URLSearchParams(location.search);
    const loginId = params.get("loginId")
    const [comments, setComments] = useState([])
    const currentStatusId = 1;
    const [statuses, setStatuses] = useState([])
    const accessToken = localStorage.getItem('accessToken');


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
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            isAdminUser ? sendMessageByAdmin() : sendMessageByUser();
        }
    }

    const getData = async () => {
        var response = await fetch(`https://localhost:5001/Employee/Comments?loginId=${loginId}`, {
            method: "GET"
        })
        var data = await response.json()
        var comments = data.result.comments
        setComments(comments)
        getStatus()
    }

    const getStatus = async () => {
        var response = await fetch(`https://localhost:5001/Admin/Statuses`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        var data = await response.json()
        var statuses = data.result.statuses
        setStatuses(statuses)
        console.log(statuses);
    }
    const sendMessageByUser = async () => {
        const form = new FormData();
        form.append("loginId", loginId);
        form.append("comment", formData.comment);
        form.append("uploadFile", formData.uploadFile);
        try {
            const response = await fetch("https://localhost:5001/Employee/Comments", {
                method: "POST",
                body: form,
            });

            if (response.ok) {
                getData()
                setFormData((prevState) => ({
                    ...prevState,
                    comment: "",
                }));
            } else {
                alert("There was an issue submitting your feedback.");
            }
        } catch (error) {
            alert("Error occurred while submitting the feedback.");
        }
    }
    const sendMessageByAdmin = async () => {
        const form = new FormData();
        form.append("loginId", loginId);
        form.append("comment", formData.comment);
        form.append("uploadFile", formData.uploadFile);
        try {
            const response = await fetch("https://localhost:5001/Admin/Comments", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: form,
            });

            if (response.ok) {
                getData()
                setFormData((prevState) => ({
                    ...prevState,
                    comment: "",
                }));
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
                        <span className="font-bold text-[#00A0DF]">Status </span>
                        <span className={statusColors[statusId] || "text-black"}>
                            {
                                statuses.find(s => s.id === statusId)?.name
                            }
                        </span>
                    </div>
                </div>

                <div className="flex flex-col flex-end gap-4 mb-4">
                    {comments.map((item, index) => {
                        const isLeft = item.isAdmin !== isAdminUser;
                        return (
                            <div key={index} className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                                <div className={`p-3 rounded-2xl max-w-[55%] ${isLeft ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'}`}>
                                    {item.text}
                                </div>
                            </div>
                        );
                    })}


                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                        <input
                            name='comment'
                            type="text"
                            value={formData.comment}
                            onKeyDown={handleKeyDown}
                            onChange={handleInputChange}
                            placeholder="Bura yeni mesaj yazın"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                        />
                        <button type='button' onClick={() => isAdminUser ? sendMessageByAdmin : sendMessageByUser} className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
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