import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { nanoid } from "nanoid";
import { NextAuthOptions, getServerSession } from "next-auth";

import prisma from "@/prisma/client";
import GoogleProvider from 'next-auth/providers/google';

 export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
    ],
    session: {
        strategy: 'jwt'
    }
}

 export const getAuthSession = () => getServerSession( authOptions )