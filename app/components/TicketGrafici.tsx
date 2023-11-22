'use client';

import { Card } from '@radix-ui/themes';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';


interface Props {
    aperti: number;
    inLavorazione: number;
    chiusi: number;
}

const TicketGrafici = ({ aperti, inLavorazione, chiusi }: Props) => {
    const data = [
        {label: 'Aperti', value: aperti },
        {label: 'In Lavorazione', value: inLavorazione },
        {label: 'Chiusi', value: chiusi }
    ]
    return (
        <Card>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={data}>
                    <XAxis dataKey='label' />
                    <YAxis />
                    <Bar dataKey='value' barSize={60} style={{ fill: 'var(--accent-9)'}} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default TicketGrafici