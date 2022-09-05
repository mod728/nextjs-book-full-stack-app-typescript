import type { NextApiRequest, NextApiResponse } from "next"
import connectDB from "../../../utils/database"  
import { ItemModel } from "../../../utils/schemaModels"
import { SavedItemDataType, ResReadSingleType } from "../../../utils/types"

const getSingleItem = async(req: NextApiRequest, res: NextApiResponse<ResReadSingleType>) => {  
    try{
        await connectDB()
        const singleItem: SavedItemDataType | null = await ItemModel.findById(req.query.id) 
        if(!singleItem) return res.status(400).json({message: "アイテムが存在していないため読み取り失敗"})
        return res.status(200).json({message: "アイテム読み取り成功（シングル）", singleItem: singleItem})
    }catch(err){
        return res.status(400).json({message: "アイテム読み取り失敗（シングル）"})
    }
}

export default getSingleItem