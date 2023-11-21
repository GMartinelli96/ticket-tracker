import React from 'react'
import { Button } from '@radix-ui/themes' 
import Link from 'next/link'
const TicketsPage = () => {
  return (
    <div>
      <Button>
        <Link href="/tickets/new">
          Nuovo Ticket
        </Link>
      </Button>
    </div>
    
  )
}

export default TicketsPage
