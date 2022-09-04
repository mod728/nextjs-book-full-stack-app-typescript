import type { NextApiResponse } from "next"
import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"
import { ExtendedNextApiRequestUser, ResMessageType } from "../../../utils/types" 

const registerUser = async(req: ExtendedNextApiRequestUser, res: NextApiResponse<ResMessageType>) => {
    try{
        await connectDB()
        await UserModel.create(req.body)
        return res.status(200).json({message: "ユーザー登録成功"})
    }catch(err){
        return res.status(400).json({message: "ユーザー登録失敗"})
    }
}

export default registerUser