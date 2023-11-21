import TicketStatoBadge from '@/app/components/TicketStatoBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'; 

interface Props{
    params:{
        id: string
    }
}

const TicketDettaglioPage = async ({ params }: Props) => {
    const ticket = await prisma.ticket.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!ticket)
        notFound();

    return (
        <div>
            <Heading as="h1">
                {ticket.titolo}
            </Heading>
            
            <Flex gap="3"  my="2">
                <TicketStatoBadge stato={ticket.stato} />
                <Text>
                    {ticket.createdAt.toDateString()}
                </Text>
            </Flex>

            <Card className='prose' mt="4">
                <ReactMarkdown>
                    {ticket.descrizione}
                </ReactMarkdown>
            </Card>
        </div>
    )
}

export default TicketDettaglioPage