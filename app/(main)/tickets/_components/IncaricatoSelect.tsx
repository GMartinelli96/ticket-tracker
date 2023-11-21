"use client";

import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import axios from 'axios';
import React, { useEffect } from 'react'

const IncaricatoSelect = () => {
    const [utenti, setUtenti] = React.useState<User[]>([])

    useEffect(() => {
        const fetchUtenti = async () => {
            const { data } = await axios.get<User[]>('/api/utenti')
            setUtenti(data)
        }

        fetchUtenti();
    }, [])

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assegna...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggerimenti</Select.Label>
                    {utenti.map((utente) => (
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