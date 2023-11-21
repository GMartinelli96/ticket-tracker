"use client" 

import { cn } from '@/lib/utils'
import { Box, Container, Flex } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'

export const NavBar = () => {
    const currentPath = usePathname();
    const { status, data: session } = useSession();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Tickets', href: '/tickets' },
    ]


    return (
        <nav className='border-b mb-5 px-5 h-14 py-3'>
            <Container>
                <Flex justify="between">
                    <Flex align='center' gap="3">
                        <Link href="/">
                            <AiFillBug />
                        </Link>
                        <ul className='flex space-x-6'>
                            { links.map(link => 
                                <li key={link.href}>
                                    <Link 
                                        href={link.href} 
                                        className={cn(
                                            'text-zinc-500 hover:text-zinc-800 transition-colors', 
                                            link.href === currentPath && 'text-zinc-900'
                                        )}
                                    >
                                        {link.label}    
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </Flex>
                    <Box>
                        {status === 'authenticated' && (
                            <Link href="api/auth/signout">Log out</Link>
                        )}
                        {status === 'unauthenticated' && (
                            <Link href="api/auth/signin">Log in</Link>
                        )}
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}
