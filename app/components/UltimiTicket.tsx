import prisma from '@/prisma/client';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import React from 'react';
import Link from 'next/link';
import { TicketStatoBadge } from '.';

const UltimiTicket = async () => {
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
        incaricato: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">Ultimi ticket</Heading>
      <Table.Root>
        <Table.Body>
          {tickets.map((ticket) => (
            <Table.Row key={ticket.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${ticket.id}`}>
                      {ticket.titolo}
                    </Link>
                    <TicketStatoBadge stato={ticket.stato} />
                  </Flex>
                  {ticket.incaricato && (
                    <Avatar
                      src={ticket.incaricato.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default UltimiTicket;