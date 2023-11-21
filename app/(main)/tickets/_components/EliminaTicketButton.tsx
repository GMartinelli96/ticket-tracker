"use client";

import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';

const EliminaTicketButton = ( { ticketId }: {ticketId: number} ) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>
            <TrashIcon />
            Elimina Ticket
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Eliminazione ticket</AlertDialog.Title>
        <AlertDialog.Description>
          Sei sicuro di voler eliminare il ticket?<br/>
          Questa operazione è irreversibile!
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>Annulla</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color='red'>Elimina ticket</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default EliminaTicketButton