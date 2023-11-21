import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const creaTicketSchema = z.object({
    titolo: z.string().min(1).max(255),
    descrizione: z.string().min(1),
});

export async function POST(req: NextRequest){
    const body = await req.json();
    const validation = creaTicketSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400});

    // Creazione del ticket
    const nuovoTicket = await prisma.ticket.create({
        data:{
            titolo: body.titolo,
            descrizione: body.descrizione,
        }
    })

    console.log("Ticket creato con successo!", nuovoTicket)


    return NextResponse.json(nuovoTicket, { status: 201});
}