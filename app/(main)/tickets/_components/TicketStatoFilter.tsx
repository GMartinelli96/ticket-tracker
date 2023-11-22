"use client";

import { TicketStato } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const stati: {label:string, value?: TicketStato }[] = [
    {label: 'Tutti'},
    {label: 'Aperti', value: TicketStato.APERTO},
    {label: 'In lavorazione', value: TicketStato.IN_LAVORAZIONE},
    {label: 'Chiusi', value: TicketStato.CHIUSO},
]

const TicketStatoFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <Select.Root 
            defaultValue={searchParams.get('stato') || 'nonselezionato'}
            onValueChange={(stato) => {
                const params = new URLSearchParams();
                if(stato) 
                    params.append('stato', stato);
                if(searchParams.get('orderBy')) 
                    params.append('orderBy', searchParams.get('orderBy')!);
                if(searchParams.get('orderByDirection')) 
                    params.append('orderByDirection', searchParams.get('orderByDirection')!);
                
                const query = params.toString() ? `?${params.toString()}` : '';
                router.push(`/tickets${query}`)
            }}
        >
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