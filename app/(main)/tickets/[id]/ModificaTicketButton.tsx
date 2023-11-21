import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const ModificaTicketButton = ( { ticketId }: {ticketId: number} ) => {
  return (
    <Button>
        <Pencil2Icon />
        <Link href={`/tickets/${ticketId}/edit`}>Modifica Ticket</Link>
    </Button>
  )
}

export default ModificaTicketButton