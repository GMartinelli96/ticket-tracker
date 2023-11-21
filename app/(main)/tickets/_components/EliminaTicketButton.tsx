import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const EliminaTicketButton = ( { ticketId }: {ticketId: number} ) => {
  return (
    <Button color='red'>
        <TrashIcon />
        <Link href={`/tickets/${ticketId}/edit`}>Elimina Ticket</Link>
    </Button>
  )
}

export default EliminaTicketButton