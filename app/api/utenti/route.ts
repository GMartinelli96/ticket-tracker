import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest){
    try{
        const session = await getServerSession(authOptions);
        if(!session)
            return NextResponse.json("Unauthorized", {status: 401});
    
        // Creazione del ticket
        const utenti = await prisma.user.findMany({
            orderBy:{
                name: "asc",
            }
        })
    
        return NextResponse.json(utenti, { status: 201});
    }
    catch(error){
        console.log("[UTENTI_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}