import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ticketSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest){
    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json("Unauthorized", {status: 401});

    const body = await req.json();
    const validation = ticketSchema.safeParse(body);
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