import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import jwt from "jsonwebtoken"
import { DecodedType } from "./types"

const secret_key = "nextmarket"

const useAuth = () => {
    const [loginUser, setLoginUser] = useState("")

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        
        if(!token){
            router.push("/user/login") 
        }
    
        try{
            const decoded = jwt.verify(token as string, secret_key)
            setLoginUser((decoded as DecodedType).email)
        }catch(error){
            router.push("/user/login")
        }
    }, [router])

    return loginUser
}

export default useAuth