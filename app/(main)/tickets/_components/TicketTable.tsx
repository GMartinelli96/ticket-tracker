import { TicketStatoBadge } from '@/app/components'
import { Ticket, TicketStato } from '@prisma/client'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import { default as Link, default as NextLink } from 'next/link'

export interface TicketQuery{
    stato: TicketStato,
    orderBy: keyof Ticket;
    orderByDirection: 'asc' | 'desc';
    page: string;
}

interface Props{
    tickets: Ticket[];
    searchParams: TicketQuery
}

const TicketTable = ( { tickets, searchParams } : Props) => {

    return (
        <Table.Root variant='surface'>
            <Table.Header>
            <Table.Row>
                {colonne.map((colonna) => (
                <Table.ColumnHeaderCell 
                    key={colonna.value} 
                    className={colonna.className}
                >
                    <NextLink 
                    href={{ query: { ...searchParams, orderBy: colonna.value, orderByDirection: searchParams.orderByDirection === 'asc' ? 'desc' : 'asc' }}}
                    >
                    {colonna.label}
                    </NextLink>
                    {colonna.value === searchParams.orderBy && searchParams.orderByDirection == 'asc' && <ArrowUpIcon className="inline"/>}
                    {colonna.value === searchParams.orderBy && searchParams.orderByDirection == 'desc' && <ArrowDownIcon className="inline"/>}
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
    )
}


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

export const ticketNomiColonne = colonne.map((colonna) => colonna.value);


export default TicketTable;