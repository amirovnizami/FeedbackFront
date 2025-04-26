import { Navigate, useNavigate } from "react-router-dom"
function Navigation() {
    const navigate = useNavigate()
    return (
        <div className=" flex gap-3 w-[70%] mx-auto mt-10">
            <h2 className="text-[#5C5C5C] font-bold  gap-3 cursor-pointer hover-underline" onClick={()=> { 
                navigate('/')
            }} > <img src="/src/assets/user.png" alt="" /> Şəxsi məlumatlar</h2>
            <h2 className="text-[#5C5C5C] font-bold  gap-3 cursor-pointer hover-underline" onClick={() => {
                navigate('/loginUser')
            }} > <img src="/src/assets/user.png" alt="" /> Müraciət İD ilə giriş </h2>

        </div>
    )

}
export default Navigation