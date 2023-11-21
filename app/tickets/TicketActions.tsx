import { Button, Link } from '@radix-ui/themes'
import React from 'react'

const TicketActions = () => {
    return (
    <div className='mb-5'>
        <Button>
        <Link href="/tickets/new">
            Nuovo Ticket
        </Link>
        </Button>
    </div>
    )
}

export default TicketActions