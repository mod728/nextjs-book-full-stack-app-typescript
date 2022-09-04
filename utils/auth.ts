import type { NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { ExtendedNextApiRequestAuth, DecodedType, ResMessageType } from "./types"

const secret_key = "nextmarket"

const auth = (handler: Function) => {
    return async(req: ExtendedNextApiRequestAuth, res: NextApiResponse<ResMessageType>) => {
        if(req.method === "GET"){
            return handler(req, res)
        }

        const token = "eyJhbGciOiJIUzI1NiIeyJlbWFpbCI6Inl5IiwiaWF0IjoxNjYyMzE4MTg5LCJleHAiOjE2NjI0MDA5ODl9.d8LMP8_yGAwRys3Q2G8-oAwa1Cy8YpaeZD1C7COaqHM"
        
        // await req.headers.authorization.split(" ")[1]

        if(!token){
            return res.status(401).json({message: "トークンがありません"})
        }

        try{
            const decoded = jwt.verify(token, secret_key)
            req.body.email = (decoded as DecodedType).email
            return handler(req, res)
        }catch(err){
            return res.status(401).json({message: "トークンが正しくないので、ログインしてください"}) // 追加
        } 
    }
}

export default auth