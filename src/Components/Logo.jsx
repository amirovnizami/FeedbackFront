import { useNavigate } from "react-router-dom"
function Logo() {
    const navigate = useNavigate()
    return (
        <>
            <div className="max-w-5xl mt-5 mx-auto flex gap-2 items-center cursor-pointer" onClick={()=>{
                navigate('/')
            }}>
                <img className="w-12" src="/src/assets/company_logo.png" alt="" />
                <h1 className="text-4xl text-blue-600">XCOMPANY</h1>
            </div>

        </>

    )
}
export default Logo