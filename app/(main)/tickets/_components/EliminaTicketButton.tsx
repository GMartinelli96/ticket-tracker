"use client";

import { Spinner } from '@/app/components';
import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const EliminaTicketButton = ( { ticketId }: {ticketId: number} ) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const eliminaTicket = async () => {
    try{
      setIsDeleting(true);
      await axios.delete(`/api/tickets/${ticketId}`);
      router.push('/tickets');
      router.refresh();
    }
    catch(err){
      setError(true);
    }
    finally{
      setIsDeleting(false);
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button 
            color='red'
            disabled={isDeleting}
          >
              <TrashIcon />
              Elimina Ticket
              {isDeleting && <Spinner />}
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
              <Button 
                color='red'
                onClick={eliminaTicket}>
                Elimina ticket
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Errore</AlertDialog.Title>
          <AlertDialog.Description>
            Si è verificato un errore durante il delete del ticket.
          </AlertDialog.Description>
          <Button 
            color='gray' 
            variant='soft' 
            mt="2"
            onClick={() => {
              setError(false);
            }}
          >OK</Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default EliminaTicketButton