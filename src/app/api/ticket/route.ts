import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session?.user) {
        return NextResponse.json({ error: 'Não Autorizado' }, { status: 401 })
    }

    const { id } = await request.json()
    const findTicket = await prisma.ticket.findFirst({
        where: {
            id: id as string
        }
    })

    if (!findTicket) {
        return NextResponse.json({ error: 'Não foi possível atualizar o ticket' }, { status: 400 })
    }

    try {
        await prisma.ticket.update({
            where: {
                id: id as string
            },
            data: {
                status: 'FECHADO'
            }
        })
        return NextResponse.json({ message: 'Chamado atualizado com sucesso' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Não foi possível atualizar o ticket' }, { status: 400 })
    }
}

export async function POST(request: Request) {
    const { customerId, name, description } = await request.json()

    if (!customerId || !name || !description) {
        return NextResponse.json({ error: 'Falha na criação do ticket' }, { status: 400 })
    }

    try {
        await prisma.ticket.create({
            data: {
                customerId: customerId,
                description: description,
                name: name,
                status: "ABERTO"
            }
        })
        return NextResponse.json({ messge: 'Chamado criado com sucesso' })
    } catch (error) {

    }
}