import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'

//Rota para deletar um cliente
export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Não Autorizado' }, { status: 401 })

    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')

    if (!userId) {
        return NextResponse.json({ error: 'Falha ao deletar o cliente' }, { status: 400 })
    }

    const findTickets = await prisma.ticket.findFirst({
        where: {
            customerId: userId
        }
    })
    if (findTickets) {
        return NextResponse.json({ error: 'Cliente com ticket aberto' }, { status: 400 })
    }

    try {
        await prisma.customer.delete({
            where: {
                id: userId as string
            }
        })
        return NextResponse.json({ message: 'Cliente deletado com sucesso' })
    } catch (error) {
        return NextResponse.json({ error: 'Falha ao deletar o cliente' }, { status: 400 })
    }

    return NextResponse.json({ ok: true })
}

//Rota para cadastrar um cliente
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

//Rota para lista o cliente
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const customerEmail = searchParams.get('email')

    if (!customerEmail || customerEmail === '') {
        return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 400 })
    }

    try {
        const customer = await prisma.customer.findFirst({
            where: {
                email: customerEmail
            }
        })
        return NextResponse.json(customer)
    } catch (error) {
        return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 400 })
    }
}