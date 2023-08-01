import { prisma } from '../db/db';
import { NextFunction, Request, Response} from "express";
import { Product, ProductCreate } from '../types/utils';

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products: Product[] = await prisma().product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product: ProductCreate = req.body;
        const newProduct = await prisma().product.create({
            data: product
        })
        res.json(newProduct);
    } catch (error) {
        res.status(500).send({"error": "Error creating product"});
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const deletedProduct = await prisma().product.delete({
            where: {
                id: Number(id)
            }
        })

        if(!deletedProduct) return res.status(404).send({"error": "Product not found"})

        res.status(204).send();
    } catch (error) {
        res.status(500).send({"error": "Error deleting product"});
    }
}
