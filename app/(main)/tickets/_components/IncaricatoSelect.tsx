"use client";

import { Skeleton } from '@/app/components';
import { Ticket, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const IncaricatoSelect = ( { ticket } : { ticket: Ticket} ) => {
    const { data: utenti, error, isLoading} = useQuery<User[]>({
        queryKey: ['utenti'],
        queryFn: async () =>  axios.get<User[]>('/api/utenti').then((res) => res.data),
        staleTime: 60 * 1000,    // La lista degli utenti viene cachata e tenuta buona per 60 secondi
        retry: 3,                // Se la richiesta fallisce, viene ritentata 3 volte
    })

    if(isLoading) 
        return <Skeleton />
    
    if(error) 
        return null;

    return (
        <>
            <Select.Root 
                defaultValue={ticket.incaricatoId || ''}
                onValueChange={async (userId) => {
                    try{
                        await axios.patch(`/api/tickets/${ticket.id}`, { 
                            incaricatoId:  (userId !== "NonAssegnato" ? userId : null) 
                        })
                    }
                    catch(error){
                        toast.error('Errore durante l\'assegnazione del ticket!')
                    }
                }}
            >
                <Select.Trigger placeholder='Assegna...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Seleziona incaricato</Select.Label>
                        <Select.Item value="NonAssegnato">Non assegnato</Select.Item>
                        {utenti?.map((utente) => (
                            <Select.Item key={utente.id} value={utente.id}>
                                {utente.name}
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

export default IncaricatoSelect