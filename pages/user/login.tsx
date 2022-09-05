import type { NextPage } from "next"
import { useState } from "react"
import Head from "next/head"

const Login: NextPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {  
        e.preventDefault()
        try{
            const response = await fetch("http://localhost:3000/api/user/login", {  
                method: "POST",
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const jsonData = await response.json() 
            localStorage.setItem("token", jsonData.token)
            alert(jsonData.message)  
        }catch(err){
            alert("ログイン失敗") 
        }
    }

    return (
        <div>
            <Head><title>ログイン</title></Head>
            <h1 className="page-title">ログイン</h1>
            <form onSubmit={handleSubmit}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required/>
                <button>ログイン</button>
            </form>
        </div>
    )
}

export default Login