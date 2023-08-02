import { User, Decoded, UpdateData } from '../types/utils'
import { ACCESS_KEY, REFRESH_KEY, SUPER_USER } from '../config';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response} from "express";
import bcrypt from 'bcrypt'
import { prisma } from '../db/db';


export const registerAuth = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        const user: User = req.body;
        const userFind = await prisma().users.findFirst({
            where: {
                email: email
            }
        })

        if (userFind) return res.status(400).json({error: "Email already exists"})
        const hashPass = await bcrypt.hash(password, 10);
        const userCreated = await prisma().users.create({
            data: {
                ...user,
                password: hashPass,
            }
        });

        const accessToken = jwt.sign({email: email, name: name, id: userCreated.id},
            ACCESS_KEY,
            { expiresIn: '1h' })
        const refreshToken = jwt.sign({email: email, name: name, id: userCreated.id}, REFRESH_KEY, { expiresIn: '12h' })

        res.json({ accessToken: accessToken, refreshToken: refreshToken, email: email  });
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const loginAuth = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userFind = await prisma().users.findFirst({
            where: {
                email: email
            }
        })
        if (!userFind) return res.status(400).json({error: "Email not found"})

        const valid = await bcrypt.compare(password, userFind.password);
        if(!valid) return res.status(400).json({error: "Invalid password"})

        const accessToken = jwt.sign({email: email, name: userFind.name, id: userFind.id},
            ACCESS_KEY,
            { expiresIn: '1h' })
        const refreshToken = jwt.sign({email: email, name: userFind.name, id: userFind.id}, REFRESH_KEY, { expiresIn: '12h' })
        res.json({ accessToken: accessToken, refreshToken: refreshToken, email: email  });
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const refreshAuthToken = async (req: Request, res: Response) => {
    try {
        let refreshToken = req.headers.authorization?.split(' ')[1];
        if (!refreshToken) return res.status(401).json({error: "Unauthorized: Token not provided"})

        const decoded = jwt.verify(refreshToken, REFRESH_KEY) as Decoded;
        if (!decoded) return res.status(401).json({error: "Unauthorized: Token not valid"})

        const accessToken = jwt.sign({email: decoded.email, name: decoded.name, id: decoded.id}, ACCESS_KEY, {expiresIn: '1h'})
        refreshToken = jwt.sign({email: decoded.email, name: decoded.name, id: decoded.id}, REFRESH_KEY, {expiresIn: '12h'})

        res.json({accessToken: accessToken,refreshToken: refreshToken, email: decoded.email});
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1];

        if(!accessToken) return res.status(401).json({error: "Unauthorized: Token not provided"})

        jwt.verify(accessToken, ACCESS_KEY, async (err, user) => {
            if(err) return res.status(401).json({error: "ERROR VERIFY TOKEN"})
            if(!user) return res.status(401).json({error: "Unauthorized: Token not valid"})
            res.locals.user = user as Decoded
            next()
        })
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1];

        if(!accessToken) return res.status(401).json({error: "Unauthorized: Token not provided"})

        jwt.verify(accessToken, ACCESS_KEY, async (err, user) => {
            if(err) return res.status(401).json({error: "ERROR VERIFY TOKEN"})
            if(!user) return res.status(401).json({error: "Unauthorized: Token not valid"})
            if( res.locals.user.email !== SUPER_USER) return res.status(401).json({error: "Unauthorized: Token not valid"})
            res.locals.user = user as Decoded
            next()
        })
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const updateProfileUser = async (req: Request, res: Response) => {
    try {
        const user: Decoded = res.locals.user
        const { newName, newLast_name , newPassword } = req.body;

        const infoUser = await prisma().users.findFirst({
            where: {
                email: user.email
            }
        })

        if(!infoUser) return res.status(400).json({error: "User not found"})

        const updateData: UpdateData = {}
        if(newName) updateData.name = newName;
        if(newLast_name) updateData.last_name = newLast_name;
        if(newPassword) {
            const hashPass = await bcrypt.hash(newPassword, 10);
            updateData.password = hashPass;
        }

        const updatedUser = await prisma().users.update({
            where: {
                id: user.id
            },
            data: updateData
        })

        res.status(204).json();
    } catch (error) {
        res.status(500).json({error: error});
    }
}

