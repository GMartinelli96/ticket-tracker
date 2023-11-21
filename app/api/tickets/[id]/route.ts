import { ticketSchema } from "@/app/validationSchemas";
import { authOptions } from "@/lib/auth";
import prisma from "@/prisma/client";
import { request } from "http";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest, 
    { params }: { params: { id: string } } 
) {
    try{
        const session = await getServerSession(authOptions);
        if(!session)
            return NextResponse.json("Unauthorized", {status: 401});

        const body = await req.json();
        const validation = ticketSchema.safeParse(body);

        if(!validation.success) 
            return NextResponse.json(validation.error.format(), { status: 400 });

        const ticket = await prisma.ticket.findUnique({
            where: { id: parseInt(params.id) }
        });
        if(!ticket) 
            return new NextResponse("Ticket non valido", { status: 500 });

        const ticketAggiornato = await prisma.ticket.update({
            where: { id: ticket.id },
            data: {
                titolo: body.titolo,
                descrizione: body.descrizione,
            }
        });

        return NextResponse.json(ticketAggiornato);

    }
    catch(error){
        console.log("[TICKETS_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }

}


export async function DELETE(
    req: NextRequest, 
    { params }: { params: { id: string } } 
) {
    try{
        const session = await getServerSession(authOptions);
        if(!session)
            return NextResponse.json("Unauthorized", {status: 401});
        
        const ticket = await prisma.ticket.findUnique({
            where: { id: parseInt(params.id) }
        });
        if(!ticket) 
            return new NextResponse("Ticket non valido", { status: 500 });

        await prisma.ticket.delete({
            where: { id: ticket.id },
        });

        return NextResponse.json({});
    }
    catch(error){
        console.log("[TICKETS_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }

}