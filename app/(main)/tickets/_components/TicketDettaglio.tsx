import { TicketStatoBadge } from '@/app/components'
import { Ticket } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

const TicketDettaglio = ( { ticket } : { ticket: Ticket} ) => {
  return (
    <>
        <Heading as="h1">
            {ticket.titolo}
        </Heading>

        <Flex gap="3"  my="2">
            <TicketStatoBadge stato={ticket.stato} />
            <Text>
                {ticket.createdAt.toDateString()}
            </Text>
        </Flex>

        <Card className='prose max-w-full' mt="4">
            <ReactMarkdown>
                {ticket.descrizione}
            </ReactMarkdown>
        </Card>
    </>
  );
}

export default TicketDettaglio