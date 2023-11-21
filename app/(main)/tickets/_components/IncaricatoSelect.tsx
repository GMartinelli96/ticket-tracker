"use client";

import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react'
import { Skeleton } from '@/app/components';

const IncaricatoSelect = () => {
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
        <Select.Root>
            <Select.Trigger placeholder='Assegna...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Seleziona incaricato</Select.Label>
                    {utenti?.map((utente) => (
                        <Select.Item key={utente.id} value={utente.id}>
                            {utente.name}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default IncaricatoSelect