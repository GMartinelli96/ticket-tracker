"use client";

import { TicketStato } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const stati: {label:string, value?: TicketStato }[] = [
    {label: 'Tutti'},
    {label: 'Aperti', value: TicketStato.APERTO},
    {label: 'In lavorazione', value: TicketStato.IN_LAVORAZIONE},
    {label: 'Chiusi', value: TicketStato.CHIUSO},
]

const TicketStatoFilter = () => {
  return (
    <Select.Root>
        <Select.Trigger placeholder='Filtra per stato...' />
        <Select.Content>
            {stati.map((s, i) => (
                <Select.Item key={i} value={s.value || ''}>
                    {s.label}
                </Select.Item>
            ))}
        </Select.Content>
    </Select.Root>
  )
}

export default TicketStatoFilter