import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props{
    params:{
        id: string
    }
}

const TicketDettaglioPage = async ({ params }: Props) => {
    if(typeof params.id !== 'number')
        notFound();

    const ticket = await prisma.ticket.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!ticket)
        notFound();

    return (
        <div>
            <p>{ticket.titolo}</p>
            <p>{ticket.descrizione}</p>
            <p>{ticket.stato}</p>
            <p>{ticket.createdAt.toDateString()}</p>
        </div>
    )
}

export default TicketDettaglioPage