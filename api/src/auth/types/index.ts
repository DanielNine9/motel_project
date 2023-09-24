import { Exclude } from "class-transformer";
import { typeUser } from "@prisma/client";


export interface RegisterType {
    username: string
    firstName: string
    lastName: string
    email: string
    address: string
    password: string
    contact: string
    imageURL?: string
}


export interface LoginType {
    email: string
    password: string
}

export interface JWTPayload {
    id: number
    role: typeUser
}
