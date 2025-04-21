import React from "react";
import { useState, useEffect } from "react";

const feedbacks = [
    { id: "T4007DBF", topic: "Office", date: "12/06/24", status: "Cavab gözlənilir" },
    { id: "0FMA9S64", topic: "Office", date: "07/06/24", status: "Cavab gözlənilir" },
    { id: "N80IE8Z9", topic: "Remote", date: "01/06/24", status: "Davam edir" },
    { id: "F401QC38", topic: "Office", date: "27/05/24", status: "Yeni" },
    { id: "V8S6JKNR", topic: "Remote", date: "15/05/24", status: "Tamamlandı" },
    { id: "1AE9IWGF", topic: "Remote", date: "10/05/24", status: "Davam edir" },
    { id: "63H1DP1W", topic: "Office", date: "07/05/24", status: "Yeni" },
    { id: "R3X9YB2S", topic: "Office", date: "07/05/24", status: "Tamamlandı" },
    { id: "HYX592OX", topic: "Office", date: "02/05/24", status: "Davam edir" },
    { id: "PM923NO6", topic: "Office", date: "01/05/24", status: "Cavab gözlənilir" },
    { id: "L3E45135", topic: "Remote", date: "29/04/24", status: "Tamamlandı" },
];




const statusColors = {
    "Cavab gözlənilir": "bg-red-200 text-red-700",
    "Davam edir": "bg-blue-200 text-blue-700",
    "Yeni": "bg-yellow-200 text-yellow-700",
    "Tamamlandı": "bg-green-200 text-green-700",
};

import Navigation from "../../Components/Navigation";
import Logo from "../../Components/Logo";
export default function FeedbackTable() {

    const [feedbackss, setFeedbacks] = useState([])

    const listAllFeedbacks = async () => {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch(`https://localhost:5001/Admin/Feedbacks/987`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setFeedbacks(data.result)
        } else {
            console.error("Ocurred an error:i", response.status);
        }
    };

    useEffect(() => {
        listAllFeedbacks();
    }, []);

    return (
        <>

            <Logo></Logo>
            <div className=" w-[80%] m-auto mt-10">
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
                        {feedbackss.map(({ id, loginId, branchId }) => (
                            <tr key={id} className="border-b hover:bg-gray-100">
                                <td className="p-2">{loginId}</td>
                                <td className="p-2">{branchId}</td>
                                <td className="p-2">{new Date().toLocaleDateString()}</td> {/* Default tarix */}
                                <td className="p-2">
                                    <span className="px-2 py-1 rounded-full text-sm font-medium bg-yellow-200 text-yellow-800">
                                        Gözləmədə
                                    </span>
                                </td>
                                <td className="p-2 flex gap-2">
                                    <button className="text-gray-600 hover:text-blue-500">
                                        <i className="fas fa-eye"></i>
                                    </button>
                                    <button className="text-gray-600 hover:text-red-500">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>

    );
}
