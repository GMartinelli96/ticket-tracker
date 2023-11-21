import React from 'react'
import { Table } from '@radix-ui/themes'
import TicketActions from './TicketActions'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CaricamentoTicketPage = () => {
    const tickets = [1,2,3,4,5]

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
                    <Table.Row key={ticket}>
                    <Table.Cell>
                        <Skeleton />
                        <div className='block md:hidden'>
                            <Skeleton />
                        </div>
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>
                        <Skeleton />
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>
                        <Skeleton />
                    </Table.Cell>
                    </Table.Row>
                ))}
    
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default CaricamentoTicketPage