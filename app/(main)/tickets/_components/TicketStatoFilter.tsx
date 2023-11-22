"use client";

import { TicketStato } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import React from 'react'

const stati: {label:string, value?: TicketStato }[] = [
    {label: 'Tutti'},
    {label: 'Aperti', value: TicketStato.APERTO},
    {label: 'In lavorazione', value: TicketStato.IN_LAVORAZIONE},
    {label: 'Chiusi', value: TicketStato.CHIUSO},
]

const TicketStatoFilter = () => {
    const router = useRouter();

    return (
        <Select.Root onValueChange={(stato) => {
            const query = stato && stato !== 'nonselezionato' ? `?stato=${stato}` : ''
            router.push(`/tickets${query}`)
        }}>
            <Select.Trigger placeholder='Filtra per stato...' />
            <Select.Content>
                {stati.map((s, i) => (
                    <Select.Item key={i} value={s.value || 'nonselezionato'}>
                        {s.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}

export default TicketStatoFilter