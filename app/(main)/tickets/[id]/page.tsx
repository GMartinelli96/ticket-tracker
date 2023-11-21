import TicketStatoBadge from '@/app/components/TicketStatoBadge'
import prisma from '@/prisma/client'
import { Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import ModificaTicketButton from './ModificaTicketButton'
import TicketDettaglio from './TicketDettaglio'

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
        <Grid columns={{ initial: "1", md: "2"}} gap="5">
            <Box>
                <TicketDettaglio ticket={ticket} />
            </Box>
            <Box>
                <ModificaTicketButton ticketId={ticket.id} />
            </Box>
        </Grid>
    )
}

export default TicketDettaglioPage