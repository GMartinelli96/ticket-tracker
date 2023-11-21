import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import TicketForm from '../../_components/TicketForm'

interface Props {
  params: {
    id: string
  }
}

const Modifica = async ( { params } : Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id)
    }
  })

  if(!ticket)
    notFound();

  return (
    <TicketForm ticket={ticket} />
  )
}

export default Modifica