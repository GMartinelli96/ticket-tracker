import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ModificaTicketButton from '../_components/ModificaTicketButton'
import TicketDettaglio from '../_components/TicketDettaglio'

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
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
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