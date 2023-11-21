import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { nanoid } from "nanoid";
import { NextAuthOptions, getServerSession } from "next-auth";

import prisma from "@/prisma/client";
import GoogleProvider from 'next-auth/providers/google';

 export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            id: "google",
            name: "Google",
            clientId: process.env.GOOGLE_CLIENT_ID!,            /**Punto Esclamativo è per bypassare typescript, ENV verrà fornito */
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
   
 }

 export const getAuthSession = () => getServerSession( authOptions )