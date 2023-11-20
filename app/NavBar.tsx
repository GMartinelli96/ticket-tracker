import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'

export const NavBar = () => {
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Tickets', href: '/tickets' },
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/">
                <AiFillBug />
            </Link>
            <ul className='flex space-x-6'>
                { links.map(link => 
                    <Link key={link.href} href={link.href} className='text-zinc-500 hover:text-zinc-800 transition-colors'>{link.label}</Link>
                )}
            </ul>
        </nav>
    )
}
