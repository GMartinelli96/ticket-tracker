"use client" 

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'

export const NavBar = () => {
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Tickets', href: '/tickets' },
    ]

    const currentPath = usePathname();

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/">
                <AiFillBug />
            </Link>
            <ul className='flex space-x-6'>
                { links.map(link => 
                    <Link 
                        key={link.href} 
                        href={link.href} 
                        className={cn(
                            'text-zinc-500 hover:text-zinc-800 transition-colors', 
                            link.href === currentPath && 'text-zinc-900'
                        )}
                    >
                        {link.label}    
                    </Link>
                )}
            </ul>
        </nav>
    )
}
