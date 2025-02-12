import { useEffect } from "react"
import { useNavigate } from "react-router"

const Logout = ()=> {
    const navigate = useNavigate()

    useEffect(()=> {
        localStorage.removeItem("token")
        navigate("/login")
    } , [navigate])
}

export default Logout;