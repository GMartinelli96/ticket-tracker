import { TicketStato } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

interface Props {
  aperti: number;
  inLavorazione: number;
  chiusi: number;
}

const RiepilogoTicket = ({ aperti, inLavorazione, chiusi }: Props) => {
  const containers: {
    label: string;
    value: number;
    stato: TicketStato;
  }[] = [
    { label: 'Ticket Aperti', value: aperti, stato: TicketStato.APERTO },
    {
      label: 'Ticket In Lavorazione',
      value: inLavorazione,
      stato: TicketStato.IN_LAVORAZIONE
    },
    { label: 'Ticket Chiusi', value: chiusi, stato: TicketStato.CHIUSO },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              className='text-sm font-medium'
              href={`/tickets?status=${container.stato}`}
            >
              {container.label}
            </Link>
            <Text size="5" className='font-bold'>{container.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default RiepilogoTicket;