import Pagination from '@/app/components/Pagination'
import prisma from '@/prisma/client'
import { TicketStato } from '@prisma/client'
import TicketActions from './_components/TicketActions'
import TicketTable, { TicketQuery, ticketNomiColonne } from './_components/TicketTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props{
  searchParams : TicketQuery
}

//Serve per forzare la non-cache della pagina! Dice dopo quanti secondi deve essere rivalidata la pagina!
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Issue Tracker - Elenco Ticket',
  description: 'Visualizza tutti i ticket del progetto!'
};


const TicketsPage = async ( { searchParams } : Props) => {
  

  //Controllo se lo stato in searchparams è un TicketStato, sennò nullo
  const statiTicket = Object.values(TicketStato);
  const statoTicket = statiTicket.includes(searchParams.stato) ? searchParams.stato : undefined;
  
  //Implemento le condizioni where in un oggetto in modo che non devo ripetere il codice per le condizioni where nelle 2 query
  const where = {
    stato: statoTicket
  }


  const orderByDirection = searchParams.orderByDirection === 'asc' ? 'asc' : 'desc';
  const orderBy = ticketNomiColonne
    .includes(searchParams.orderBy) 
      ? { [searchParams.orderBy]: orderByDirection }
      : undefined;

  //Implemento paginazione
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const tickets = await prisma.ticket.findMany({
    where,
    orderBy,

    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const ticketCount = await prisma.ticket.count({
    where
  });

  return (
    <Flex direction='column' gap='3'>
      <TicketActions />
      <TicketTable tickets={tickets} searchParams={searchParams} />
      <Pagination pageSize={pageSize} currentPage={page} itemCount={ticketCount} />
    </Flex>
    
  )
}

export default TicketsPage
