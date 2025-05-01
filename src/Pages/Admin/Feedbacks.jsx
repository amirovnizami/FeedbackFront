import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const statusColors = {
    "Yeni": "bg-yellow-200 text-yellow-700",
    "Tamamlandi": "bg-green-200 text-green-700",
    "Cavab Gözlənilir": "bg-red-200 text-red-700",
    "Davam Edir": "bg-blue-200 text-blue-700",
};

import Logo from "../../Components/Logo";

export default function FeedbackTable() {
    const [branches, setBranches] = useState([])
    const [status, setStatus] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate()

    const getStatus = async () => {
        const response = await fetch('https://localhost:5001/Admin/Statuses', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        if (response.ok) {
            const data = await response.json();
            setStatus(data.result.statuses);
        } else {
            console.error("Error fetching statuses:", response.status);
        }
    };
    const getBranches = async () => {
        try {
            const response = await fetch("https://localhost:5001/Employee/Branches");
            if (!response.ok) {
                throw new Error("Server error");
            }
            const branches = await response.json();
            var result = branches.result.branches;
            setBranches(result);
        } catch (error) {
            console.error("Error fetching branches: ", error);
        }
    };
    const listAllFeedbacks = async () => {
        const response = await fetch(`https://localhost:5001/Admin/Feedbacks`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        if (response.ok) {
            const data = await response.json();
            setFeedbacks(data.result);
            console.log(data.result)
            await getStatus();
        } else {
            console.error("Error fetching feedbacks:", response.status);
        }
    };
    const deleteFeedback = async (loginId) => {
        console.log(loginId)
        const response = await fetch(`https://localhost:5001/Admin/Feedbacks/${loginId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        if (response.ok) {
            console.log("Deleted successfuly!")
        }
        await listAllFeedbacks()
    }
    useEffect(() => {
        const fetchData = async () => {
            await getBranches()
            await getStatus();
            await listAllFeedbacks();
        };
        fetchData();
    }, []);
    return (
        <>
            <Logo />
            <div className="w-[80%] m-auto mt-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-blue-700">Şikayətlər</h2>
                    <input
                        type="text"
                        placeholder="Axtar"
                        className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-2">
                            <th className="p-2 text-blue-600">Login ID</th>
                            <th className="p-2 text-blue-600">Mövzu</th>
                            <th className="p-2 text-blue-600">Tarix</th>
                            <th className="p-2 text-blue-600">Status</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map(({ id, date, loginId, branchId, statusId }) => {
                            const currentStatus = status.find((s) => s.id === statusId);
                            const statusName = currentStatus?.name || "Bilinmir";
                            const statusClass = statusColors[statusName] || "bg-gray-200 text-gray-700";
                            const currentBranch = branches.find(branch => branch.id === branchId);

                            return (
                                <tr key={id} className="border-b hover:bg-gray-100">
                                    <td className="p-2">{loginId}</td>
                                    <td className="p-2">{
                                        currentBranch ? currentBranch.name : "Undefined"
                                    }</td>
                                    <td className="p-2">{date}</td>
                                    <td className="p-2">
                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusClass}`}>
                                            {statusName}
                                        </span>
                                    </td>
                                    <td className="p-2">
                                        <button className="text-gray-600 hover:text-blue-500">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="text-gray-600 hover:text-red-500">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                    <td className="flex items-center gap-2 justify-center">
                                        <img
                                            className="cursor-pointer"
                                            onClick={() => navigate(`/chat?loginId=${loginId}`, {
                                                state: {
                                                    isAdminUser: true,
                                                    statusId: statusId
                                                }
                                            })}
                                            src="/src/assets/view.png"
                                            alt=""
                                        />
                                        <img className="cursor-pointer" onClick={() => deleteFeedback(loginId)} src="/src/assets/delete.jpg" alt="" />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
