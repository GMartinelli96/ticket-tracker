import { TicketStato } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'


const ticketStatoMap: Record<
    TicketStato, 
    { label: string, color: 'red' | 'violet' | 'green' }
> ={
    APERTO: { label: 'Aperto', color: 'red' },
    IN_LAVORAZIONE: { label: 'In lavorazione', color: 'violet' },
    CHIUSO: { label: 'Chiuso', color: 'green'},
};


interface Props{
    stato: TicketStato
}

const TicketStatoBadge = ({ stato } : Props) => {

  return (
    <Badge 
        color={ticketStatoMap[stato].color}
    >
        {ticketStatoMap[stato].label}
    </Badge>
  )
}

export default TicketStatoBadge