import React from 'react'
import { Button, Table } from '@radix-ui/themes' 
import Link from 'next/link'
import prisma from '@/prisma/client'
const TicketsPage = async () => {
  const tickets = await prisma.ticket.findMany()

  return (
    <div>
      <div className='mb-5'>
        <Button>
          <Link href="/tickets/new">
            Nuovo Ticket
          </Link>
        </Button>
      </div>
      
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
                  {ticket.stato}
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {ticket.stato}
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
