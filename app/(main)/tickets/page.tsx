import React from 'react'
import { Link, Table } from '@radix-ui/themes' 
import prisma from '@/prisma/client'
import TicketStatoBadge from '@/app/components/TicketStatoBadge'
import TicketActions from './TicketActions'


const TicketsPage = async () => {
  const tickets = await prisma.ticket.findMany()

  return (
    <div>
      <TicketActions />
      
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Ticket</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Stato</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Data creazione</Table.ColumnHeaderCell>
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

export default TicketsPage
