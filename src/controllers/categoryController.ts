import { Request, Response } from "express"
import { prisma } from "../db/db"
import { CategoryCreate } from "../types/utils"

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma().category.findMany()
        if(!categories) return res.status(500).json({error: 'Categories not exists'})
        res.json(categories)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const createCategory = async (req: Request, res: Response) => {
    try {
        const category: CategoryCreate = req.body;
        await prisma().category.create({
            data: category
        })
        res.json({message: 'Category created'})
    } catch (error) {
        res.status(500).json({message: error})
    }
}