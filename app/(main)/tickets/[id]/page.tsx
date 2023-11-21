import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ModificaTicketButton from '../_components/ModificaTicketButton'
import TicketDettaglio from '../_components/TicketDettaglio'
import EliminaTicketButton from '../_components/EliminaTicketButton'

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
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
            <Box className='md:col-span-4'>
                <TicketDettaglio ticket={ticket} />
            </Box>
            <Box>
                <Flex direction="column" gap="4" >
                    <ModificaTicketButton ticketId={ticket.id} />
                    <EliminaTicketButton ticketId={ticket.id} />
                </Flex>
            </Box>
        </Grid>
    )
}

export default TicketDettaglioPage