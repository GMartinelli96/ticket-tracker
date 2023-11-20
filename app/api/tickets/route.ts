import { NextRequest } from "next/server";
import * as z from "zod";

const creaTicketSchema = z.object({
    titolo: z.string().min(1).max(255),
    descrizione: z.string().min(1),
});

export async function POST(req: NextRequest){
    const body = await req.json();
    creaTicketSchema.safeParse(body);

    
}