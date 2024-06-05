import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Não Autorizado' }, { status: 401 })

    }
    const { name, email, phone, address, userId } = await request.json()
    try {
        await prisma.customer.create({
            data: {
                name,
                email,
                phone,
                address: address ? address : '',
                userId: userId
            }
        })
        return NextResponse.json({ message: "Cliente cadastrado com sucesso!" })
    } catch (error) {
        return NextResponse.json({ error: 'Falha na criação' }, { status: 400 })
    }
}