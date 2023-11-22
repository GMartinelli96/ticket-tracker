import { Link, TicketStatoBadge } from '@/app/components'
import prisma from '@/prisma/client'
import { Ticket, TicketStato } from '@prisma/client'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import NextLink from 'next/link'
import TicketActions from './_components/TicketActions'

interface Props{
  searchParams : {
    stato: TicketStato,
    orderBy: keyof Ticket,
    orderByDirection: 'asc' | 'desc'
  } 
}

const TicketsPage = async ( { searchParams } : Props) => {
  const colonne: { label: string; value: keyof Ticket; className?: string; }[] = [
    { label: "Ticket", value: "titolo" },
    {
      label: "Stato",
      value: "stato",
      className: "hidden md:table-cell",
    },
    {
      label: "Data creazione",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  //Controllo se lo stato in searchparams è un TicketStato, sennò nullo
  const statiTicket = Object.values(TicketStato);
  const statoTicket = statiTicket.includes(searchParams.stato) ? searchParams.stato : undefined;
  
  const orderByDirection = searchParams.orderByDirection === 'asc' ? 'asc' : 'desc';
  const orderBy = colonne
    .map((colonna) => colonna.value)
    .includes(searchParams.orderBy) 
      ? { [searchParams.orderBy]: orderByDirection }
      : undefined;

  const tickets = await prisma.ticket.findMany({
    where:{
      stato: statoTicket
    },
    orderBy
  });

  return (
    <div>
      <TicketActions />
      
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {colonne.map((colonna) => (
              <Table.ColumnHeaderCell 
                key={colonna.value} 
                className={colonna.className}
              >
                <NextLink 
                  href={{ query: { ...searchParams, orderBy: colonna.value, orderByDirection: orderByDirection === 'asc' ? 'desc' : 'asc' }}}
                >
                  {colonna.label}
                </NextLink>
                {colonna.value === searchParams.orderBy && orderByDirection == 'asc' && <ArrowUpIcon className="inline"/>}
                {colonna.value === searchParams.orderBy && orderByDirection == 'desc' && <ArrowDownIcon className="inline"/>}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tickets.map((ticket) => (
            <Table.Row key={ticket.id}>
              <Table.Cell>
                <Link href={`/tickets/${ticket.id}`}>
                  {ticket.titolo}
                </Link>
                <div className='block md:hidden'>
                  <TicketStatoBadge stato={ticket.stato} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <TicketStatoBadge stato={ticket.stato} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {ticket.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}

        </Table.Body>
      </Table.Root>
    </div>
    
  )
}

//Serve per forzare la non-cache della pagina! Dice dopo quanti secondi deve essere rivalidata la pagina!
export const revalidate = 0;

export default TicketsPage
