import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ModificaTicketButton from '../_components/ModificaTicketButton'
import TicketDettaglio from '../_components/TicketDettaglio'
import EliminaTicketButton from '../_components/EliminaTicketButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import IncaricatoSelect from '../_components/IncaricatoSelect'
import { cache } from 'react'

interface Props{
    params:{
        id: string
    }
}

//Funzionalità di cache per evitare di fare 2 chiamate a prisma per renderizzare gli stessi dati del ticket
const fetchTicket = cache((ticketId: number) => 
    prisma.ticket.findUnique({
    where: {
            id: ticketId
        }
    })
)


const TicketDettaglioPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions);
    const ticket = await fetchTicket(parseInt(params.id));

    if(!ticket)
        notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
            <Box className='md:col-span-4'>
                <TicketDettaglio ticket={ticket} />
            </Box>
            { session &&
                <Box>
                    <Flex direction="column" gap="4" >
                        <IncaricatoSelect ticket={ticket} />
                        <ModificaTicketButton ticketId={ticket.id} />
                        <EliminaTicketButton ticketId={ticket.id} />
                    </Flex>
                </Box>
            }
        </Grid>
    )
}

export async function generateMetadata({ params }: Props) {
    const ticket = await fetchTicket(parseInt(params.id));
  
    return {
      title: ticket?.titolo,
      description: 'Dettaglio del ticket #' + ticket?.id
    }
  }

export default TicketDettaglioPage