import { Button, Flex, Link } from '@radix-ui/themes'
import React from 'react'
import TicketStatoFilter from './TicketStatoFilter'

const TicketActions = () => {
    return (
    <Flex justify='between'>
        <TicketStatoFilter />
        <Button>
        <Link href="/tickets/new">
            Nuovo Ticket
        </Link>
        </Button>
    </Flex>
    )
}

export default TicketActions